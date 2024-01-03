<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Repairer extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('repairer_model');
    }

    function get_repairer_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['repairer_data'] = array();
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
            $success_array['repairer_data'] = $this->repairer_model->get_all_repairer_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->repairer_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->repairer_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['repairer_data'], VALUE_TWO);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['repairer_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['repairer_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_repairer_data_by_id() {
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
            $repairer_id = get_from_post('repairer_id');
            if (!$repairer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $repairer_data = $this->repairer_model->get_repairer_by_id($repairer_id);
            if (empty($repairer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['repairer_data'] = $repairer_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_repairer() {
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
            $repairer_id = get_from_post('repairer_id');
            $repairer_data = $this->_get_post_data_for_repairer();
            $validation_message = $this->_check_validation_for_repairer($repairer_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            if ($repairer_data['is_limited_company'] == IS_CHECKED_YES) {
                $proprietorData = $this->input->post('proprietor_data');
                $proprietor_decode_Data = json_decode($proprietorData, true);
                if ($proprietorData == "" || empty($proprietor_decode_Data)) {
                    echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
                    return false;
                }
            }

            $this->db->trans_start();
            $repairer_data['establishment_date'] = convert_to_mysql_date_format($repairer_data['establishment_date']);
            $repairer_data['registration_date'] = convert_to_mysql_date_format($repairer_data['registration_date']);
            if ($repairer_data['any_previous_application'] == IS_CHECKED_YES) {
                $repairer_data['license_application_date'] = convert_to_mysql_date_format($repairer_data['license_application_date']);
            }
            if ($repairer_data['is_limited_company'] == IS_CHECKED_YES) {
                $repairer_data['proprietor_details'] = $proprietorData;
            }
            //$repairer_data['user_id'] = $user_id;
            //$repairer_data['status'] = $module_type;
            if (!$repairer_id || $repairer_id == NULL) {
                $repairer_data['created_by'] = $user_id;
                $repairer_data['created_time'] = date('Y-m-d H:i:s');
                $repairer_id = $this->utility_model->insert_data('wm_repairer', $repairer_data);
            } else {
                $repairer_data['updated_by'] = $user_id;
                $repairer_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('repairer_id', $repairer_id, 'wm_repairer', $repairer_data);
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

    function _get_post_data_for_repairer() {
        $repairer_data = array();
        $repairer_data['district'] = get_from_post('district');
        $repairer_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $repairer_data['name_of_repairer'] = get_from_post('name_of_repairmen');
        $repairer_data['complete_address'] = get_from_post('complete_address');
        $repairer_data['premises_status'] = get_from_post('premises_status');
        $repairer_data['establishment_date'] = get_from_post('establishment_date');
        $repairer_data['is_limited_company'] = get_from_post('is_limited_company');
        $repairer_data['registration_date'] = get_from_post('registration_date');
        $repairer_data['registration_number'] = get_from_post('registration_number');
        $repairer_data['identity_choice'] = get_from_post('identity_choice');
        $repairer_data['identity_number'] = get_from_post('identity_number');
        $repairer_data['weights_type'] = get_from_post('weights_type');
        $repairer_data['area_operate'] = get_from_post('area_operate');
        $repairer_data['previous_experience'] = get_from_post('previous_experience');
        $repairer_data['no_of_skilled'] = get_from_post('no_of_skilled');
        $repairer_data['no_of_semiskilled'] = get_from_post('no_of_semiskilled');
        $repairer_data['no_of_unskilled'] = get_from_post('no_of_unskilled');
        $repairer_data['no_of_specialist'] = get_from_post('no_of_specialist');
        $repairer_data['details_of_personnel'] = get_from_post('details_of_personnel');
        $repairer_data['details_of_machinery'] = get_from_post('details_of_machinery');
        $repairer_data['electric_energy_availability'] = get_from_post('electric_energy_availability');
        $repairer_data['sufficient_stock'] = get_from_post('sufficient_stock');
        $repairer_data['stock_details'] = get_from_post('stock_details');
        $repairer_data['any_previous_application'] = get_from_post('any_previous_application');
        $repairer_data['license_application_date'] = get_from_post('license_application_date');
        $repairer_data['license_application_result'] = get_from_post('license_application_result');
        return $repairer_data;
    }

    function _check_validation_for_repairer($repairer_data) {
        if (!$repairer_data['district']) {
            return SELECT_DISTRICT;
        }
        if (!$repairer_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$repairer_data['name_of_repairer']) {
            return REPAIRMEN_NAME_MESSAGE;
        }
        if (!$repairer_data['complete_address']) {
            return WORKSHOPS_ADDRESS_MESSAGE;
        }
        if (!$repairer_data['registration_date']) {
            return SHOP_DATE_MESSAGE;
        }
        if (!$repairer_data['registration_number']) {
            return SHOP_REGISTRATION_NUMBER_MESSAGE;
        }
        if (!$repairer_data['identity_number']) {
            return IDENTITY_MESSAGE;
        }
        if (!$repairer_data['weights_type']) {
            return WEIGHT_TYPE_MESSAGE;
        }
        if (!$repairer_data['area_operate']) {
            return AREA_OPERATE_MESSAGE;
        }
        if (!$repairer_data['previous_experience']) {
            return PREV_EXPERIENCE_MESSAGE;
        }
        if (!$repairer_data['no_of_skilled']) {
            return SKILLED_NO_MESSAGE;
        }
        if (!$repairer_data['no_of_semiskilled']) {
            return SEMISKILLED_NO_MESSAGE;
        }
        if (!$repairer_data['no_of_unskilled']) {
            return UNSKILLED_NO_MESSAGE;
        }
        if (!$repairer_data['no_of_specialist']) {
            return TRAIN_EMP_MESSAGE;
        }
        if (!$repairer_data['details_of_personnel']) {
            return PERSONNEL_DETAIL_MESSAGE;
        }
        if (!$repairer_data['details_of_machinery']) {
            return MACHINERY_MESSAGE;
        }
        if (!$repairer_data['electric_energy_availability']) {
            return ELECTRIC_ENERGY_MESSAGE;
        }
        if ($repairer_data['sufficient_stock'] == IS_CHECKED_YES) {
            if (!$repairer_data['stock_details']) {
                return STOCK_DETAIL_MESSAGE;
            }
        }
        if ($repairer_data['any_previous_application'] == IS_CHECKED_YES) {
            if (!$repairer_data['license_application_date']) {
                return APPLIED_DATE_MESSAGE;
            }
            if (!$repairer_data['license_application_result']) {
                return LICENSE_RESULT_MESSAGE;
            }
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
            $repairer_id = get_from_post('repairer_id');
            $document_id = get_from_post('document_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$repairer_id || $repairer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('repairer_id', $repairer_id, 'wm_repairer');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'repairer' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data[$document_id];


            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('repairer_id', $repairer_id, 'wm_repairer', array($document_id => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));


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
            $repairer_id = get_from_post('repairer_id_for_repairer_form1');
            if (!is_post() || $user_id == null || !$user_id || $repairer_id == null || !$repairer_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_repairer_data = $this->utility_model->get_by_id('repairer_id', $repairer_id, 'wm_repairer');

            if (empty($existing_repairer_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('repairer_data' => $existing_repairer_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('wmrepairer/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_repairer_data_by_repairer_id() {
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
            $is_fb_details = get_from_post('load_fb_details');
            $repairer_id = get_from_post('repairer_id');
            if (!$repairer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $repairer_data = $this->utility_model->get_by_id_with_applicant_name('repairer_id', $repairer_id, 'wm_repairer');
            if (empty($repairer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWO, 'fees_bifurcation', 'module_id', $repairer_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_TWO, $repairer_id);
                }
                if ($repairer_data['status'] != VALUE_FOUR && $repairer_data['status'] != VALUE_FIVE &&
                        $repairer_data['status'] != VALUE_SIX && $repairer_data['status'] != VALUE_SEVEN &&
                        $repairer_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        $repairer_data['show_remove_upload_btn'] = true;
                        $repairer_data['show_dropdown'] = true;
                        $repairer_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWO, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['repairer_data'] = $repairer_data;
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
            $repairer_id = get_from_post('repairer_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$repairer_id || $repairer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('repairer_id', $repairer_id, 'wm_repairer');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'repairer' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('repairer_id', $repairer_id, 'wm_repairer', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $repairer_id = get_from_post('repairer_id_for_repairer_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $repairer_id == NULL || !$repairer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_repairer_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $repairer_data = array();
            if ($_FILES['challan_for_repairer_upload_challan']['name'] != '') {
                $main_path = 'documents/repairer';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'repairer';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_repairer_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_repairer_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $repairer_data['challan'] = $filename;
                $repairer_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $repairer_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $repairer_data['status'] = VALUE_NINE;
            }
            $repairer_data['payment_type'] = $payment_type;
            $repairer_data['updated_by'] = $user_id;
            $repairer_data['updated_time'] = date('Y-m-d H:i:s');
            $repairer_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_TWO, $repairer_id, $user_id, $repairer_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_TWO, 'fees_bifurcation', $update_data, 'module_id', $repairer_id);
            }

            $this->utility_model->update_data('repairer_id', $repairer_id, 'wm_repairer', $repairer_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $repairer_data['total_fees'];
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
            $repairer_id = get_from_post('repairer_id_for_repairer_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$repairer_id || $repairer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_repairer_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_repairer_approve');
            $update_data['remarks'] = get_from_post('remarks_for_repairer_approve');
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
            $ex_data = $this->utility_model->get_by_id('repairer_id', $repairer_id, 'wm_repairer');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWO, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('repairer_id', $repairer_id, 'wm_repairer', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_TWO, $repairer_id);

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
            $repairer_id = get_from_post('repairer_id_for_repairer_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$repairer_id || $repairer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_repairer_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('repairer_id', $repairer_id, 'wm_repairer');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWO, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('repairer_id', $repairer_id, 'wm_repairer', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_TWO, $repairer_id);

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
            $repairer_id = get_from_post('repairer_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $repairer_id == null || !$repairer_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_repairer_data = $this->utility_model->get_by_id('repairer_id', $repairer_id, 'wm_repairer');
            if (empty($existing_repairer_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_repairer_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('repairer_data' => $existing_repairer_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('wmrepairer/certificate', $data, TRUE));
            $mpdf->Output('Repairer_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->repairer_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Repairer_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Repairer Name',
                'Premises Status', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $premises_status_array = $this->config->item('premises_status_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_TWO]) ? $prefix_module_array[VALUE_TWO] : '';
                    $list['repairer_id'] = generate_registration_number($prefix, $list['repairer_id']);
                    $list['district'] = isset($taluka_array[$list['district']]) ? $taluka_array[$list['district']] : '-';
                    $list['entity_establishment_type'] = isset($entity_establishment_type_array[$list['entity_establishment_type']]) ? $entity_establishment_type_array[$list['entity_establishment_type']] : '-';
                    $list['premises_status'] = isset($premises_status_array[$list['premises_status']]) ? $premises_status_array[$list['premises_status']] : '-';
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