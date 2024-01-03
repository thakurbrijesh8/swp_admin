<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Hotelregi extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('hotelregi_model');
    }

    function get_hotelregi_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['hotelregi_data'] = array();
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
            $success_array['hotelregi_data'] = $this->hotelregi_model->get_all_hotelregi_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->hotelregi_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->hotelregi_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['hotelregi_data'], VALUE_SIX);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['hotelregi_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['hotelregi_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_hotelregi_data_by_id() {
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
            $hotelregi_id = get_from_post('hotelregi_id');
            if (!$hotelregi_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $hotelregi_data = $this->hotelregi_model->get_hotelregi_by_id($hotelregi_id);
            if (empty($hotelregi_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['hotelregi_data'] = $hotelregi_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_hotelregi() {
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
            $hotelregi_id = get_from_post('hotelregi_id');
            $hotelregi_data = $this->_get_post_data_for_hotelregi();
            $validation_message = $this->_check_validation_for_hotelregi($hotelregi_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

    //        if ($_FILES['seal_and_stamp_for_hotelregi']['name'] != '') {
    //            $main_path = 'documents/hotelregi';
    //            // if (!is_dir($main_path)) {
    //            //     mkdir($main_path);
    //            //     chmod("$main_path", 0755);
    //            // }
    //            $documents_path = 'documents';
    //            if (!is_dir($documents_path)) {
    //                mkdir($documents_path);
    //                chmod($documents_path, 0777);
    //            }
    //            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'hotelregi';
    //            if (!is_dir($module_path)) {
    //                mkdir($module_path);
    //                chmod($module_path, 0777);
    //            }
    //            $this->load->library('upload');
    //            $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_hotelregi']['name']);
    //            $filename = 'hotelregi_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
    //            //Change file name
    //            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
    //            if (!move_uploaded_file($_FILES['seal_and_stamp_for_hotelregi']['tmp_name'], $final_path)) {
    //                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
    //                return;
    //            }
    //            $hotelregi_data['signature'] = $filename;
    //        }

            $agentData = $this->input->post('agent_data');
            $agent_decode_Data = json_decode($agentData, true);
            if ($agentData == "" || empty($agent_decode_Data)) {
                echo json_encode(get_error_array('Enter Atlist One Agent/Agents/employee/employees Data'));
                return false;
            }
            $this->db->trans_start();

            $hotelregi_data['name_of_agent'] = $agentData;
            if ($hotelregi_data['hotel_rented_or_leased'] == VALUE_TWO) {
                $hotelregi_data['leased_date'] = convert_to_mysql_date_format($hotelregi_data['leased_date']);
            }
            // $hotelregi_data['user_id'] = $user_id;
            // $hotelregi_data['status'] = $module_type;
            if (!$hotelregi_id || $hotelregi_id == NULL) {
                $hotelregi_data['created_by'] = $user_id;
                $hotelregi_data['created_time'] = date('Y-m-d H:i:s');
                $hotelregi_id = $this->utility_model->insert_data('hotel', $hotelregi_data);
            } else {
                $hotelregi_data['updated_by'] = $user_id;
                $hotelregi_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('hotelregi_id', $hotelregi_id, 'hotel', $hotelregi_data);
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

    function _get_post_data_for_hotelregi() {
        $hotelregi_data = array();
        $hotelregi_data['name_of_hotel'] = get_from_post('name_of_hotel');
        $hotelregi_data['name_of_person'] = get_from_post('name_of_person');
        $hotelregi_data['full_address'] = get_from_post('full_address');
        $hotelregi_data['name_of_tourist_area'] = get_from_post('name_of_tourist_area');
        $hotelregi_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $hotelregi_data['name_of_proprietor'] = get_from_post('name_of_proprietor');
        $hotelregi_data['category_of_hotel'] = get_from_post('category_of_hotel');
        $hotelregi_data['fees'] = get_from_post('fees');
        $hotelregi_data['mob_no'] = get_from_post('mob_no');
        $hotelregi_data['name_of_manager'] = get_from_post('name_of_manager');
        $hotelregi_data['manager_permanent_address'] = get_from_post('manager_permanent_address');
        $hotelregi_data['permanent_resident_of_ut'] = get_from_post('permanent_resident_of_ut');
        $hotelregi_data['other_business_of_applicant'] = get_from_post('other_business_of_applicant');
        $hotelregi_data['hotel_rented_or_leased'] = get_from_post('hotel_rented_or_leased');

        return $hotelregi_data;
    }

    function _check_validation_for_hotelregi($hotelregi_data) {

        if (!$hotelregi_data['name_of_hotel']) {
            return HOTEL_NAME_MESSAGE;
        }
        if (!$hotelregi_data['name_of_person']) {
            return PERSON_NAME_MESSAGE;
        }
        if (!$hotelregi_data['full_address']) {
            return FULL_ADDRESS_MESSAGE;
        }
        if (!$hotelregi_data['name_of_tourist_area']) {
            return TOURIST_AREA_NAME_MESSAGE;
        }
        if (!$hotelregi_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$hotelregi_data['name_of_proprietor']) {
            return PROPRIETOR_NAME_MESSAGE;
        }
        if (!$hotelregi_data['category_of_hotel']) {
            return CATEGORY_HOTEL_MESSAGE;
        }
        if (!$hotelregi_data['mob_no']) {
            return MOBILE_NUMBER_MESSAGE;
        }
        if (!$hotelregi_data['name_of_manager']) {
            return MANAGER_NAME_MESSAGE;
        }
        if (!$hotelregi_data['manager_permanent_address']) {
            return MANAGER_PERMANENT_ADDRESS_MESSAGE;
        }
//        if (!$hotelregi_data['permanent_resident_of_ut']) {
//            return PERMANENT_RESIDENT_MESSAGE;
//        }
//        if (!$hotelregi_data['other_business_of_applicant']) {
//            return OTHER_BUSINESS_APPLICANT_MESSAGE;
//        }
//        if (!$hotelregi_data['hotel_rented_or_leased']) {
//            return HOTEL_RENTED_LEASED_MESSAGE;
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
            $hotelregi_id = get_from_post('hotelregi_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$hotelregi_id || $hotelregi_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('hotelregi_id', $hotelregi_id, 'hotel');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'hotelregi' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];


            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('hotelregi_id', $hotelregi_id, 'hotel', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));


            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function generate_formII() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $hotelregi_id = get_from_post('hotelregi_id_for_hotelregi_formII');
            if (!is_post() || $user_id == null || !$user_id || $hotelregi_id == null || !$hotelregi_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_hotelregi_data = $this->utility_model->get_by_id('hotelregi_id', $hotelregi_id, 'hotel');

            if (empty($existing_hotelregi_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            $taluka_array = $this->config->item('taluka_array');
            $existing_hotelregi_data['name_of_tourist_area'] = isset($taluka_array[$existing_hotelregi_data['name_of_tourist_area']]) ? $taluka_array[$existing_hotelregi_data['name_of_tourist_area']] : '-';
            error_reporting(E_ERROR);
            $data = array('hotelregi_data' => $existing_hotelregi_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('hotelregi/pdf', $data, TRUE));
            $mpdf->Output('FORM-II.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_hotelregi_data_by_hotelregi_id() {
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
            $hotelregi_id = get_from_post('hotelregi_id');
            if (!$hotelregi_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $hotelregi_data = $this->utility_model->get_by_id_with_applicant_name('hotelregi_id', $hotelregi_id, 'hotel');
            if (empty($hotelregi_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_SIX, 'fees_bifurcation', 'module_id', $hotelregi_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_SIX, $hotelregi_id);
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['hotelregi_data'] = $hotelregi_data;
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
            $hotelregi_id = get_from_post('hotelregi_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$hotelregi_id || $hotelregi_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('hotelregi_id', $hotelregi_id, 'hotel');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'hotelregi' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('hotelregi_id', $hotelregi_id, 'hotel', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $hotelregi_id = get_from_post('hotelregi_id_for_hotelregi_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $hotelregi_id == NULL || !$hotelregi_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_hotelregi_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $hotelregi_data = array();
            if ($_FILES['challan_for_hotelregi_upload_challan']['name'] != '') {
                $main_path = 'documents/hotelregi';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'hotelregi';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_hotelregi_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_hotelregi_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $hotelregi_data['challan'] = $filename;
                $hotelregi_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $hotelregi_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $hotelregi_data['status'] = VALUE_NINE;
            }
            $hotelregi_data['payment_type'] = $payment_type;
            $hotelregi_data['updated_by'] = $user_id;
            $hotelregi_data['updated_time'] = date('Y-m-d H:i:s');
            $hotelregi_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_SIX, $hotelregi_id, $user_id, $hotelregi_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_SIX, 'fees_bifurcation', $update_data, 'module_id', $hotelregi_id);
            }


            $this->utility_model->update_data('hotelregi_id', $hotelregi_id, 'hotel', $hotelregi_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $hotelregi_data['total_fees'];
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
            $hotelregi_id = get_from_post('hotelregi_id_for_hotelregi_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$hotelregi_id || $hotelregi_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_hotelregi_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_hotelregi_approve');
            $update_data['last_valid_upto'] = get_from_post('valid_upto_for_hotelregi_approve');
            $update_data['remarks'] = get_from_post('remarks_for_hotelregi_approve');
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
            $update_data['last_valid_upto'] = convert_to_mysql_date_format($update_data['last_valid_upto']);
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('hotelregi_id', $hotelregi_id, 'hotel');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_SIX, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('hotelregi_id', $hotelregi_id, 'hotel', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_SIX, $hotelregi_id);

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
            $hotelregi_id = get_from_post('hotelregi_id_for_hotelregi_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$hotelregi_id || $hotelregi_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_hotelregi_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('hotelregi_id', $hotelregi_id, 'hotel');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_SIX, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('hotelregi_id', $hotelregi_id, 'hotel', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_SIX, $hotelregi_id);

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
            $hotelregi_id = get_from_post('hotelregi_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $hotelregi_id == null || !$hotelregi_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_hotelregi_data = $this->utility_model->get_by_id('hotelregi_id', $hotelregi_id, 'hotel');
            if (empty($existing_hotelregi_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_hotelregi_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            $taluka_array = $this->config->item('taluka_array');
            $existing_hotelregi_data['name_of_tourist_area'] = isset($taluka_array[$existing_hotelregi_data['name_of_tourist_area']]) ? $taluka_array[$existing_hotelregi_data['name_of_tourist_area']] : '-';
            error_reporting(E_ERROR);
            $data = array('hotelregi_data' => $existing_hotelregi_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('hotelregi/certificate', $data, TRUE));
            $mpdf->Output('Hotelregi_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->hotelregi_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Hotel_Registration_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Hotel Name',
                'Category', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_SIX]) ? $prefix_module_array[VALUE_SIX] : '';
                    $list['hotelregi_id'] = generate_registration_number($prefix, $list['hotelregi_id']);
                    $list['name_of_tourist_area'] = isset($taluka_array[$list['name_of_tourist_area']]) ? $taluka_array[$list['name_of_tourist_area']] : '-';
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