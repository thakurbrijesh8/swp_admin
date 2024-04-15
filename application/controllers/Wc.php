<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Wc extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('wc_model');
    }

    function get_wc_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['wc_data'] = array();
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
            $success_array['wc_data'] = $this->wc_model->get_all_wc_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->wc_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->wc_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['wc_data'], VALUE_FIVE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['wc_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['wc_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_wc_data_by_id() {
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
            $wc_id = get_from_post('wc_id');
            if (!$wc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $wc_data = $this->wc_model->get_wc_by_id($wc_id);
            if (empty($wc_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['wc_data'] = $wc_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_wc() {
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
            $wc_id = get_from_post('wc_id');
            $wc_data = $this->_get_post_data_for_wc();
            $validation_message = $this->_check_validation_for_wc($wc_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            //
            //        if ($_FILES['seal_and_stamp_for_wc']['name'] != '') {
            //            $main_path = 'documents/wc';
            //            // if (!is_dir($main_path)) {
            //            //     mkdir($main_path);
            //            //     chmod("$main_path", 0755);
            //            // }
            //            $documents_path = 'documents';
            //            if (!is_dir($documents_path)) {
            //                mkdir($documents_path);
            //                chmod($documents_path, 0777);
            //            }
            //            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'wc';
            //            if (!is_dir($module_path)) {
            //                mkdir($module_path);
            //                chmod($module_path, 0777);
            //            }
            //            $this->load->library('upload');
            //            $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_wc']['name']);
            //            $filename = 'wc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //            //Change file name
            //            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //            if (!move_uploaded_file($_FILES['seal_and_stamp_for_wc']['tmp_name'], $final_path)) {
            //                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //                return;
            //            }
            //            $wc_data['signature'] = $filename;
            //        }
            //        if ($_FILES['receipt_of_last_years_house_tax_for_wc']['name'] != '') {
            //            $main_path = 'documents/wc';
            //            // if (!is_dir($main_path)) {
            //            //     mkdir($main_path);
            //            //     chmod("$main_path", 0755);
            //            // }
            //            $documents_path = 'documents';
            //            if (!is_dir($documents_path)) {
            //                mkdir($documents_path);
            //                chmod($documents_path, 0777);
            //            }
            //            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'wc';
            //            if (!is_dir($module_path)) {
            //                mkdir($module_path);
            //                chmod($module_path, 0777);
            //            }
            //            $this->load->library('upload');
            //            $temp_filename = str_replace('_', '', $_FILES['receipt_of_last_years_house_tax_for_wc']['name']);
            //            $filename = 'wc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //            //Change file name
            //            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //            if (!move_uploaded_file($_FILES['receipt_of_last_years_house_tax_for_wc']['tmp_name'], $final_path)) {
            //                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //                return;
            //            }
            //            $wc_data['receipt_of_last_years_house_tax'] = $filename;
            //        }

            $this->db->trans_start();
            //$wc_data['user_id'] = $user_id;
            //$wc_data['status'] = $module_type;
            if (!$wc_id || $wc_id == NULL) {
                $wc_data['created_by'] = $user_id;
                $wc_data['created_time'] = date('Y-m-d H:i:s');
                $wc_id = $this->utility_model->insert_data('wc', $wc_data);
            } else {
                $wc_data['updated_by'] = $user_id;
                $wc_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('wc_id', $wc_id, 'wc', $wc_data);
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

    function _get_post_data_for_wc() {
        $wc_data = array();
        $wc_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $wc_data['house_no'] = get_from_post('house_no');
        $wc_data['ward_no'] = get_from_post('ward_no');
        $wc_data['village'] = get_from_post('village');
        $wc_data['panchayat_or_dmc'] = get_from_post('panchayat_or_dmc');
        $wc_data['application_category'] = get_from_post('application_category');
        $wc_data['house_ownership'] = get_from_post('house_ownership');
        $wc_data['wc_type'] = get_from_post('wc_type');
        $wc_data['diameter_service_connection'] = get_from_post('diameter_service_connection');
        $wc_data['water_meter'] = get_from_post('water_meter');
        $wc_data['district'] = get_from_post('district');
        $wc_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        return $wc_data;
    }

    function _check_validation_for_wc($wc_data) {
        if (!$wc_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$wc_data['house_no']) {
            return HOUSE_NO_MESSAGE;
        }
        if (!$wc_data['ward_no']) {
            return WARD_NO_MESSAGE;
        }
        if (!$wc_data['village']) {
            return VILLAGE_MESSAGE;
        }
        if (!$wc_data['panchayat_or_dmc']) {
            return PANCHAYT_OR_DMC_MESSAGE;
        }
        if (!$wc_data['application_category']) {
            return APPLICANT_CATEGORY_WC_MESSAGE;
        }
        if (!$wc_data['house_ownership']) {
            return HOUSE_OWNERSHIP_MESSAGE;
        }
        if (!$wc_data['wc_type']) {
            return WC_TYPE_MESSAGE;
        }
        if (!$wc_data['diameter_service_connection']) {
            return DIAMETER_SERVICE_CONNECTION_MESSAGE;
        }
        if (!$wc_data['water_meter']) {
            return WATER_METER_MESSAGE;
        }
        if (!$wc_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$wc_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
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
            $wc_id = get_from_post('wc_id');
            $document_type = get_from_post('document_type');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$wc_id || $wc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('wc_id', $wc_id, 'wc');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if ($document_type == 1) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'wc' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['receipt_of_last_years_house_tax'];
            } else if ($document_type == 2) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'wc' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];
            }

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            if ($document_type == VALUE_ONE) {
                $this->utility_model->update_data('wc_id', $wc_id, 'wc', array('receipt_of_last_years_house_tax' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            } else if ($document_type == VALUE_TWO) {
                $this->utility_model->update_data('wc_id', $wc_id, 'wc', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            }

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
            $wc_id = get_from_post('wc_id_for_wc_form1');
            if (!is_post() || $user_id == null || !$user_id || $wc_id == null || !$wc_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_wc_data = $this->utility_model->get_by_id('wc_id', $wc_id, 'wc');

            if (empty($existing_wc_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('wc_data' => $existing_wc_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('wc/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_wc_data_by_wc_id() {
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
            $wc_id = get_from_post('wc_id');
            if (!$wc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $wc_data = $this->utility_model->get_by_id_with_applicant_name('wc_id', $wc_id, 'wc');
            if (empty($wc_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FIVE, 'fees_bifurcation', 'module_id', $wc_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FIVE, $wc_id);
                }
                if ($wc_data['status'] != VALUE_FOUR && $wc_data['status'] != VALUE_FIVE &&
                        $wc_data['status'] != VALUE_SIX && $wc_data['status'] != VALUE_SEVEN &&
                        $wc_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($wc_data['status'] != VALUE_ELEVEN) {
                            $wc_data['show_remove_upload_btn'] = true;
                        }
                        $wc_data['show_dropdown'] = true;
                        $wc_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_FIVE, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['wc_data'] = $wc_data;
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
            $wc_id = get_from_post('wc_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$wc_id || $wc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('wc_id', $wc_id, 'wc');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'wc' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('wc_id', $wc_id, 'wc', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $wc_id = get_from_post('wc_id_for_wc_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $wc_id == NULL || !$wc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_wc_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $wc_data = array();
            if ($_FILES['challan_for_wc_upload_challan']['name'] != '') {
                $main_path = 'documents/wc';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'wc';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_wc_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_wc_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $wc_data['challan'] = $filename;
                $wc_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $wc_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $wc_data['status'] = VALUE_NINE;
            }
            $wc_data['payment_type'] = $payment_type;
            $wc_data['updated_by'] = $user_id;
            $wc_data['updated_time'] = date('Y-m-d H:i:s');
            $wc_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FIVE, $wc_id, $user_id, $wc_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FIVE, 'fees_bifurcation', $update_data, 'module_id', $wc_id);
            }

            $this->utility_model->update_data('wc_id', $wc_id, 'wc', $wc_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $wc_data['total_fees'];
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
            $wc_id = get_from_post('wc_id_for_wc_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$wc_id || $wc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_wc_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_wc_approve');
            $update_data['remarks'] = get_from_post('remarks_for_wc_approve');
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
            $ex_data = $this->utility_model->get_by_id('wc_id', $wc_id, 'wc');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FIVE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('wc_id', $wc_id, 'wc', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FIVE, $wc_id);

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
            $wc_id = get_from_post('wc_id_for_wc_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$wc_id || $wc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_wc_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('wc_id', $wc_id, 'wc');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FIVE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('wc_id', $wc_id, 'wc', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FIVE, $wc_id);

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
            $wc_id = get_from_post('wc_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $wc_id == null || !$wc_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_wc_data = $this->utility_model->get_by_id('wc_id', $wc_id, 'wc');
            if (empty($existing_wc_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_wc_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('wc_data' => $existing_wc_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('wc/certificate', $data, TRUE));
            $mpdf->Output('wc_certificate_' . time() . '.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function generate_excel() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == null || !$user_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $this->db->trans_start();
            $excel_data = $this->wc_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Water_connection_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Name',
                'Category', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FIVE]) ? $prefix_module_array[VALUE_FIVE] : '';
                    $list['wc_id'] = generate_registration_number($prefix, $list['wc_id']);
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
 * EOF: ./application/controller/Wc.php
 */