<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Na extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('na_model');
    }

    function get_na_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['na_data'] = array();
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
            $success_array['na_data'] = $this->na_model->get_all_na_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->na_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->na_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['na_data'], VALUE_FOURTY);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['na_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['na_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_na_data_by_id() {
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
            $na_id = get_from_post('na_id');
            if (!$na_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $na_data = $this->na_model->get_na_by_id($na_id);
            if (empty($na_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['na_data'] = $na_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_na() {
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
            $na_id = get_from_post('na_id');
            $na_data = $this->_get_post_data_for_na();
            $validation_message = $this->_check_validation_for_na($na_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            $applicantData = $this->input->post('applicant_data');
            $applicant_decode_Data = json_decode($applicantData, true);
            if ($applicantData == "" || empty($applicant_decode_Data)) {
                echo json_encode(get_error_array('Enter Atlist One Applicant Details'));
                return false;
            }

            $this->db->trans_start();
            $na_data['multiple_applicant'] = $applicantData;
            //$na_data['user_id'] = $user_id;
            //$na_data['status'] = $module_type;
            if (!$na_id || $na_id == NULL) {
                $na_data['created_by'] = $user_id;
                $na_data['created_time'] = date('Y-m-d H:i:s');
                $na_id = $this->utility_model->insert_data('na', $na_data);
            } else {
                $na_data['updated_by'] = $user_id;
                $na_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('na_id', $na_id, 'na', $na_data);
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

    function _get_post_data_for_na() {
        $na_data = array();
        $na_data['district'] = get_from_post('district');
        $na_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $na_data['agri_purpose_a'] = get_from_post('agri_purpose_a');
        $na_data['non_agri_purpose_b'] = get_from_post('non_agri_purpose_b');
        $na_data['non_agri_purpose_c'] = get_from_post('non_agri_purpose_c');
        $na_data['rel_condition_c'] = get_from_post('rel_condition_c');
        $na_data['pre_non_agri_c'] = get_from_post('pre_non_agri_c');
        $na_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $na_data['occupation'] = get_from_post('occupation');
        $na_data['purpose'] = get_from_post('purpose');
        $na_data['postel_address'] = get_from_post('postel_address');
        $na_data['village'] = get_from_post('village');
        $na_data['survey_no'] = get_from_post('survey_no');
        $na_data['area_assessment'] = get_from_post('area_assessment');
        $na_data['area_of_site_used'] = get_from_post('area_of_site_used');
        $na_data['occupant_class'] = get_from_post('occupant_class');
        $na_data['present_use_land'] = get_from_post('present_use_land');
        $na_data['situated_land'] = get_from_post('situated_land');
        $na_data['electrical_distance_land'] = get_from_post('electrical_distance_land');
        $na_data['acquisition_under_land'] = get_from_post('acquisition_under_land');
        $na_data['accessible_land'] = get_from_post('accessible_land');
        $na_data['site_access_land'] = get_from_post('site_access_land');
        $na_data['rejected_land'] = get_from_post('rejected_land');
        return $na_data;
    }

    function _check_validation_for_na($na_data) {
        if (!$na_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$na_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$na_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$na_data['occupation']) {
            return NA_OCCUPANT_CLASS_MESSAGE;
        }
//        if (!$na_data['purpose']) {
//            return NA_PURPOSE_MESSAGE;
//        }
        if (!$na_data['postel_address']) {
            return ADDRESS_MESSAGE;
        }
        if (!$na_data['village']) {
            return VILLAGE_NAME_MESSAGE;
        }
        if (!$na_data['survey_no']) {
            return NA_SURVEY_NO_MESSAGE;
        }
        if (!$na_data['area_assessment']) {
            return NA_AREA_ASSESSMENT_MESSAGE;
        }
        if (!$na_data['area_of_site_used']) {
            return NA_AREA_SITE_MESSAGE;
        }
        if (!$na_data['occupant_class']) {
            return NA_OCCUPANT_CLASS_MESSAGE;
        }
        if (!$na_data['present_use_land']) {
            return NA_PRESENT_USE_MESSAGE;
        }
        if (!$na_data['situated_land']) {
            return NA_SITUATED_LAND_MESSAGE;
        }
//        if (!$na_data['electrical_distance_land']) {
//            return NA_ELECTRICAL_DISTANCE_LAND_MESSAGE;
//        }
//        if (!$na_data['acquisition_under_land']) {
//            return NA_ACQUISITIONS_UNDER_LAND_MESSAGE;
//        }
//        if (!$na_data['accessible_land']) {
//            return NA_ACCESSIBLE_LAND_MESSAGE;
//        }
//        if (!$na_data['site_access_land']) {
//            return NA_SITE_ACCESS_LAND_MESSAGE;
//        }
//        if (!$na_data['rejected_land']) {
//            return NA_REJECTED_LAND_MESSAGE;
//        }

        return '';
    }

    function remove_document() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $na_id = get_from_post('na_id');
            $document_type = get_from_post('document_type');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$na_id || $na_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('na_id', $na_id, 'na');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if ($document_type == VALUE_ONE) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'na' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['receipt_of_last_years_house_tax'];
            } else if ($document_type == VALUE_TWO) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'na' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];
            }

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            if ($document_type == VALUE_ONE) {
                $this->utility_model->update_data('na_id', $na_id, 'na', array('receipt_of_last_years_house_tax' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            } else if ($document_type == VALUE_TWO) {
                $this->utility_model->update_data('na_id', $na_id, 'na', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            }

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
            $na_id = get_from_post('na_id_for_na_form');
            if (!is_post() || $user_id == null || !$user_id || $na_id == null || !$na_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_na_data = $this->utility_model->get_by_id('na_id', $na_id, 'na');

            if (empty($existing_na_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            $taluka_array = $this->config->item('taluka_array');
            $existing_na_data['district'] = isset($taluka_array[$existing_na_data['district']]) ? $taluka_array[$existing_na_data['district']] : '-';
            error_reporting(E_ERROR);
            $data = array('na_data' => $existing_na_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('na/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_na_data_by_na_id() {
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
            $na_id = get_from_post('na_id');
            if (!$na_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $na_data = $this->utility_model->get_by_id_with_applicant_name('na_id', $na_id, 'na');
            if (empty($na_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTY, 'fees_bifurcation', 'module_id', $na_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FOURTY, $na_id);
                }
                if ($na_data['status'] != VALUE_FOUR && $na_data['status'] != VALUE_FIVE &&
                        $na_data['status'] != VALUE_SIX && $na_data['status'] != VALUE_SEVEN &&
                        $na_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($na_data['status'] != VALUE_ELEVEN) {
                            $na_data['show_remove_upload_btn'] = true;
                        }
                        $na_data['show_dropdown'] = true;
                        $na_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTY, 'dept_fd');
                    }
                }
            }
            $success_array = get_success_array();
            $success_array['na_data'] = $na_data;
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
            $na_id = get_from_post('na_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$na_id || $na_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('na_id', $na_id, 'na');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'na' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('na_id', $na_id, 'na', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $na_id = get_from_post('na_id_for_na_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $na_id == NULL || !$na_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_na_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $na_data = array();
            if ($_FILES['challan_for_na_upload_challan']['name'] != '') {
                $main_path = 'documents/na';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'na';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_na_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_na_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $na_data['challan'] = $filename;
                $na_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $na_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $na_data['status'] = VALUE_NINE;
            }
            $na_data['payment_type'] = $payment_type;
            $na_data['updated_by'] = $user_id;
            $na_data['updated_time'] = date('Y-m-d H:i:s');
            $na_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FOURTY, $na_id, $user_id, $na_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FOURTY, 'fees_bifurcation', $update_data, 'module_id', $na_id);
            }

            $this->utility_model->update_data('na_id', $na_id, 'na', $na_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $na_data['total_fees'];
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
            $na_id = get_from_post('na_id_for_na_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$na_id || $na_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_na_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_na_approve');
            $update_data['remarks'] = get_from_post('remarks_for_na_approve');
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
            $ex_data = $this->utility_model->get_by_id('na_id', $na_id, 'na');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($_FILES['certificate_file_for_na_approve']['name'] == '') {
                echo json_encode(get_error_array(UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['certificate_file_for_na_approve']['size'];
            if ($evidence_size == 0) {
                echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $main_path = 'certificate';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $ad_path = $main_path . DIRECTORY_SEPARATOR . 'rev_coll';
            if (!is_dir($ad_path)) {
                mkdir($ad_path);
                chmod("$ad_path", 0755);

                $file = DIRECTORY_SEPARATOR . 'index.html';
                $temp_path = $main_path . $file;
                chmod($temp_path, 0755);
                copy($temp_path, $ad_path . $file);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['certificate_file_for_na_approve']['name']);
            $filename = 'nac_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $ad_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['certificate_file_for_na_approve']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $update_data['certificate_file'] = $filename;
            $temp_fc_filename = 'temp_nafc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            error_reporting(E_ERROR);
            $data = array('na_data' => $ex_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('na/qr_barcode', $data, TRUE));
            $temp_fc_path = $ad_path . DIRECTORY_SEPARATOR . $temp_fc_filename;

            // Save Temporary QR Code File
            $mpdf->Output($temp_fc_path, 'F');

            $temp_files_to_merge = array();
            array_push($temp_files_to_merge, $temp_fc_path);
            array_push($temp_files_to_merge, $final_path);
            $final_certificate_filename = 'nafc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            $final_filepath = FCPATH . $ad_path . DIRECTORY_SEPARATOR . $final_certificate_filename;

            // Merge QR Code File with Uploaded Certificate
            merge_pdf($final_filepath, $temp_files_to_merge);

            // Remove Temporary QR Code File
            if (file_exists($temp_fc_path)) {
                unlink($temp_fc_path);
            }

            $update_data['final_certificate'] = $final_certificate_filename;
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTY, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('na_id', $na_id, 'na', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FOURTY, $na_id);

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
            $na_id = get_from_post('na_id_for_na_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$na_id || $na_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_na_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('na_id', $na_id, 'na');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTY, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('na_id', $na_id, 'na', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FOURTY, $na_id);

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
            $na_id = get_from_post('na_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $na_id == null || !$na_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_na_data = $this->utility_model->get_by_id('na_id', $na_id, 'na');
            if (empty($existing_na_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_na_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            //        $taluka_array = $this->config->item('taluka_array');
            //        $existing_na_data['district'] = isset($taluka_array[$existing_na_data['district']]) ? $taluka_array[$existing_na_data['district']] : '-';
            error_reporting(E_ERROR);
            $data = array('na_data' => $existing_na_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('na/certificate', $data, TRUE));
            $mpdf->Output('na_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->na_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Land_use_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Name',
                'Occupation', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FOURTY]) ? $prefix_module_array[VALUE_FOURTY] : '';
                    $list['na_id'] = generate_registration_number($prefix, $list['na_id']);
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
 * EOF: ./application/controller/Na.php
 */