<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Manufacturer extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('manufacturer_model');
    }

    function get_manufacturer_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['manufacturer_data'] = array();
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
            $success_array['manufacturer_data'] = $this->manufacturer_model->get_all_manufacturer_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->manufacturer_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->manufacturer_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['manufacturer_data'], VALUE_FOUR);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['manufacturer_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['manufacturer_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_manufacturer_data_by_id() {
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
            $manufacturer_id = get_from_post('manufacturer_id');
            if (!$manufacturer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $manufacturer_data = $this->manufacturer_model->get_manufacturer_by_id($manufacturer_id);
            if (empty($manufacturer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['manufacturer_data'] = $manufacturer_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_manufacturer() {
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
            $manufacturer_id = get_from_post('manufacturer_id');
            $manufacturer_data = $this->_get_post_data_for_manufacturer();
            $validation_message = $this->_check_validation_for_manufacturer($manufacturer_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            if ($manufacturer_data['is_limited_company'] == IS_CHECKED_YES) {
                $proprietorData = $this->input->post('proprietor_data');
                $proprietor_decode_Data = json_decode($proprietorData, true);
                if ($proprietorData == "" || empty($proprietor_decode_Data)) {
                    echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
                    return false;
                }
            }

            $this->db->trans_start();
            $manufacturer_data['establishment_date'] = convert_to_mysql_date_format($manufacturer_data['establishment_date']);
            $manufacturer_data['registration_date'] = convert_to_mysql_date_format($manufacturer_data['registration_date']);
            $manufacturer_data['inspection_sample_date'] = convert_to_mysql_date_format($manufacturer_data['inspection_sample_date']);
            if ($manufacturer_data['any_previous_application'] == IS_CHECKED_YES) {
                $manufacturer_data['license_application_date'] = convert_to_mysql_date_format($manufacturer_data['license_application_date']);
            }
            if ($manufacturer_data['is_limited_company'] == IS_CHECKED_YES) {
                $manufacturer_data['proprietor_details'] = $proprietorData;
            }
            //$manufacturer_data['user_id'] = $user_id;
            //$manufacturer_data['status'] = $module_type;
            if (!$manufacturer_id || $manufacturer_id == NULL) {
                $manufacturer_data['created_by'] = $user_id;
                $manufacturer_data['created_time'] = date('Y-m-d H:i:s');
                $manufacturer_id = $this->utility_model->insert_data('wm_manufacturer', $manufacturer_data);
            } else {
                $manufacturer_data['updated_by'] = $user_id;
                $manufacturer_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('manufacturer_id', $manufacturer_id, 'wm_manufacturer', $manufacturer_data);
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

    function _get_post_data_for_manufacturer() {
        $manufacturer_data = array();
        $manufacturer_data['district'] = get_from_post('district');
        $manufacturer_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $manufacturer_data['name_of_manufacturer'] = get_from_post('name_of_manufacturer');
        $manufacturer_data['complete_address'] = get_from_post('complete_address');
        $manufacturer_data['premises_status'] = get_from_post('premises_status');
        $manufacturer_data['establishment_date'] = get_from_post('establishment_date');
        $manufacturer_data['is_limited_company'] = get_from_post('is_limited_company');
        $manufacturer_data['registration_date'] = get_from_post('registration_date');
        $manufacturer_data['registration_number'] = get_from_post('registration_number');
        $manufacturer_data['manufacturing_activity'] = get_from_post('manufacturing_activity');
        $manufacturer_data['weights_type'] = get_from_post('weights_type');
        $manufacturer_data['measures_type'] = get_from_post('measures_type');
        $manufacturer_data['weighing_instruments_type'] = get_from_post('weighing_instruments_type');
        $manufacturer_data['measuring_instruments_type'] = get_from_post('measuring_instruments_type');
        $manufacturer_data['no_of_skilled'] = get_from_post('no_of_skilled');
        $manufacturer_data['no_of_semiskilled'] = get_from_post('no_of_semiskilled');
        $manufacturer_data['no_of_unskilled'] = get_from_post('no_of_unskilled');
        $manufacturer_data['no_of_specialist'] = get_from_post('no_of_specialist');
        $manufacturer_data['details_of_personnel'] = get_from_post('details_of_personnel');
        $manufacturer_data['details_of_machinery'] = get_from_post('details_of_machinery');
        $manufacturer_data['details_of_foundry'] = get_from_post('details_of_foundry');
        $manufacturer_data['steel_casting_facility'] = get_from_post('steel_casting_facility');
        $manufacturer_data['electric_energy_availability'] = get_from_post('electric_energy_availability');
        $manufacturer_data['details_of_loan'] = get_from_post('details_of_loan');
        $manufacturer_data['banker_names'] = get_from_post('banker_names');
        $manufacturer_data['identity_choice'] = get_from_post('identity_choice');
        $manufacturer_data['identity_number'] = get_from_post('identity_number');
        $manufacturer_data['any_previous_application'] = get_from_post('any_previous_application');
        $manufacturer_data['license_application_date'] = get_from_post('license_application_date');
        $manufacturer_data['license_application_result'] = get_from_post('license_application_result');
        $manufacturer_data['location_of_selling'] = get_from_post('location_of_selling');
        $manufacturer_data['model_approval_detail'] = get_from_post('model_approval_detail');
        $manufacturer_data['inspection_sample_date'] = get_from_post('inspection_sample_date');
        return $manufacturer_data;
    }

    function _check_validation_for_manufacturer($manufacturer_data) {
        if (!$manufacturer_data['district']) {
            return SELECT_DISTRICT;
        }
        if (!$manufacturer_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$manufacturer_data['name_of_manufacturer']) {
            return REPAIRMEN_NAME_MESSAGE;
        }
        if (!$manufacturer_data['complete_address']) {
            return WORKSHOPS_ADDRESS_MESSAGE;
        }
        if (!$manufacturer_data['premises_status']) {
            return PREMISES_STATUS_MESSAGE;
        }
        if (!$manufacturer_data['registration_date']) {
            return SHOP_DATE_MESSAGE;
        }
        if (!$manufacturer_data['registration_number']) {
            return SHOP_REGISTRATION_NUMBER_MESSAGE;
        }
        if (!$manufacturer_data['manufacturing_activity']) {
            return ACTIVITY_MESSAGE;
        }
        if (!$manufacturer_data['weights_type']) {
            return WEIGHT_TYPE_MESSAGE;
        }
        if (!$manufacturer_data['measures_type']) {
            return MEASURE_TYPE_MESSAGE;
        }
        if (!$manufacturer_data['weighing_instruments_type']) {
            return WEIGHT_INSTRUMENT_MESSAGE;
        }
        if (!$manufacturer_data['measuring_instruments_type']) {
            return MEASURE_INSTRUMENT_MESSAGE;
        }
        if (!$manufacturer_data['no_of_skilled']) {
            return SKILLED_NO_MESSAGE;
        }
        if (!$manufacturer_data['no_of_semiskilled']) {
            return SEMISKILLED_NO_MESSAGE;
        }
        if (!$manufacturer_data['no_of_unskilled']) {
            return UNSKILLED_NO_MESSAGE;
        }
        if (!$manufacturer_data['no_of_specialist']) {
            return TRAIN_EMP_MESSAGE;
        }
        if (!$manufacturer_data['details_of_personnel']) {
            return PERSONNEL_DETAIL_MESSAGE;
        }
        if (!$manufacturer_data['details_of_machinery']) {
            return MACHINERY_MESSAGE;
        }
        if (!$manufacturer_data['details_of_foundry']) {
            return FOUNDRY_MESSAGE;
        }
        if (!$manufacturer_data['steel_casting_facility']) {
            return CASTING_FACILITY_MESSAGE;
        }
        if (!$manufacturer_data['electric_energy_availability']) {
            return ELECTRIC_ENERGY_MESSAGE;
        }
        if (!$manufacturer_data['details_of_loan']) {
            return LOAN_DETAIL_MESSAGE;
        }
        if (!$manufacturer_data['banker_names']) {
            return BANK_NAME_MESSAGE;
        }
        if (!$manufacturer_data['identity_choice']) {
            return IDENTITY_CHOICE_MESSAGE;
        }
        if (!$manufacturer_data['identity_number']) {
            return IDENTITY_MESSAGE;
        }
        if ($manufacturer_data['any_previous_application'] == IS_CHECKED_YES) {
            if (!$manufacturer_data['license_application_date']) {
                return APPLIED_DATE_MESSAGE;
            }
            if (!$manufacturer_data['license_application_result']) {
                return LICENSE_RESULT_MESSAGE;
            }
        }
        if (!$manufacturer_data['location_of_selling']) {
            return SELLING_LOCATION_MESSAGE;
        }
        if (!$manufacturer_data['model_approval_detail']) {
            return APPROVAL_MODEL_MESSAGE;
        }
        if (!$manufacturer_data['inspection_sample_date']) {
            return INSPECTION_DATE_MESSAGE;
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
            $manufacturer_id = get_from_post('manufacturer_id');
            $document_id = get_from_post('document_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$manufacturer_id || $manufacturer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('manufacturer_id', $manufacturer_id, 'wm_manufacturer');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'manufacturer' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data[$document_id];

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('manufacturer_id', $manufacturer_id, 'wm_manufacturer', array($document_id => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));

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
            $manufacturer_id = get_from_post('manufacturer_id_for_manufacturer_form1');
            if (!is_post() || $user_id == null || !$user_id || $manufacturer_id == null || !$manufacturer_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_manufacturer_data = $this->utility_model->get_by_id('manufacturer_id', $manufacturer_id, 'wm_manufacturer');

            if (empty($existing_manufacturer_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('manufacturer_data' => $existing_manufacturer_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('wmmanufacturer/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_manufacturer_data_by_manufacturer_id() {
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
            $manufacturer_id = get_from_post('manufacturer_id');
            if (!$manufacturer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $manufacturer_data = $this->utility_model->get_by_id_with_applicant_name('manufacturer_id', $manufacturer_id, 'wm_manufacturer');
            if (empty($manufacturer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOUR, 'fees_bifurcation', 'module_id', $manufacturer_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FOUR, $manufacturer_id);
                }
                if ($manufacturer_data['status'] != VALUE_FOUR && $manufacturer_data['status'] != VALUE_FIVE &&
                        $manufacturer_data['status'] != VALUE_SIX && $manufacturer_data['status'] != VALUE_SEVEN &&
                        $manufacturer_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($manufacturer_data['status'] != VALUE_ELEVEN) {
                            $manufacturer_data['show_remove_upload_btn'] = true;
                        }
                        $manufacturer_data['show_dropdown'] = true;
                        $manufacturer_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOUR, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['manufacturer_data'] = $manufacturer_data;
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
            $manufacturer_id = get_from_post('manufacturer_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$manufacturer_id || $manufacturer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('manufacturer_id', $manufacturer_id, 'wm_manufacturer');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'manufacturer' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('manufacturer_id', $manufacturer_id, 'wm_manufacturer', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $manufacturer_id = get_from_post('manufacturer_id_for_manufacturer_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $manufacturer_id == NULL || !$manufacturer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_manufacturer_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $manufacturer_data = array();
            if ($_FILES['challan_for_manufacturer_upload_challan']['name'] != '') {
                $main_path = 'documents/manufacturer';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'manufacturer';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_manufacturer_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_manufacturer_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $manufacturer_data['challan'] = $filename;
                $manufacturer_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $manufacturer_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $manufacturer_data['status'] = VALUE_NINE;
            }
            $manufacturer_data['payment_type'] = $payment_type;
            $manufacturer_data['updated_by'] = $user_id;
            $manufacturer_data['updated_time'] = date('Y-m-d H:i:s');
            $manufacturer_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FOUR, $manufacturer_id, $user_id, $manufacturer_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FOUR, 'fees_bifurcation', $update_data, 'module_id', $manufacturer_id);
            }
            $this->utility_model->update_data('manufacturer_id', $manufacturer_id, 'wm_manufacturer', $manufacturer_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $manufacturer_data['total_fees'];
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
            $manufacturer_id = get_from_post('manufacturer_id_for_manufacturer_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$manufacturer_id || $manufacturer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_manufacturer_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_manufacturer_approve');
            $update_data['remarks'] = get_from_post('remarks_for_manufacturer_approve');
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
            $ex_data = $this->utility_model->get_by_id('manufacturer_id', $manufacturer_id, 'wm_manufacturer');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOUR, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('manufacturer_id', $manufacturer_id, 'wm_manufacturer', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FOUR, $manufacturer_id);

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
            $manufacturer_id = get_from_post('manufacturer_id_for_manufacturer_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$manufacturer_id || $manufacturer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_manufacturer_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('manufacturer_id', $manufacturer_id, 'wm_manufacturer');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOUR, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('manufacturer_id', $manufacturer_id, 'wm_manufacturer', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FOUR, $manufacturer_id);

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
            $manufacturer_id = get_from_post('manufacturer_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $manufacturer_id == null || !$manufacturer_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_manufacturer_data = $this->utility_model->get_by_id('manufacturer_id', $manufacturer_id, 'wm_manufacturer');
            if (empty($existing_manufacturer_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_manufacturer_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('manufacturer_data' => $existing_manufacturer_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('wmmanufacturer/certificate', $data, TRUE));
            $mpdf->Output('Manufacturer_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->manufacturer_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Manufacturer_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Manufacturer Name',
                'Address', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FOUR]) ? $prefix_module_array[VALUE_FOUR] : '';
                    $list['manufacturer_id'] = generate_registration_number($prefix, $list['manufacturer_id']);
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