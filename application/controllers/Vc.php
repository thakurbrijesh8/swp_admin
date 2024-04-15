<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Vc extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('vc_model');
    }

    function get_vc_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['vc_data'] = array();
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
            $success_array['vc_data'] = $this->vc_model->get_all_vc_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->vc_model->get_total_count_of_records($search_district);
            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->vc_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['vc_data'], VALUE_FOURTYEIGHT);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['vc_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['vc_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_vc_data_by_id() {
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
            $vc_id = get_from_post('vc_id');
            if (!$vc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $vc_data = $this->vc_model->get_vc_by_id($vc_id);
            if (empty($vc_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['vc_data'] = $vc_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_vc() {
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
            $vc_id = get_from_post('vc_id');
            $vc_data = $this->_get_post_data_for_vc();
            $validation_message = $this->_check_validation_for_vc($vc_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            //
            //        if ($_FILES['seal_and_stamp_for_vc']['name'] != '') {
            //            $main_path = 'documents/vc';
            //            // if (!is_dir($main_path)) {
            //            //     mkdir($main_path);
            //            //     chmod("$main_path", 0755);
            //            // }
            //            $documents_path = 'documents';
            //            if (!is_dir($documents_path)) {
            //                mkdir($documents_path);
            //                chmod($documents_path, 0777);
            //            }
            //            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'vc';
            //            if (!is_dir($module_path)) {
            //                mkdir($module_path);
            //                chmod($module_path, 0777);
            //            }
            //            $this->load->library('upload');
            //            $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_vc']['name']);
            //            $filename = 'vc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //            //Change file name
            //            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //            if (!move_uploaded_file($_FILES['seal_and_stamp_for_vc']['tmp_name'], $final_path)) {
            //                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //                return;
            //            }
            //            $vc_data['signature'] = $filename;
            //        }
            //        if ($_FILES['receipt_of_last_years_house_tax_for_vc']['name'] != '') {
            //            $main_path = 'documents/vc';
            //            // if (!is_dir($main_path)) {
            //            //     mkdir($main_path);
            //            //     chmod("$main_path", 0755);
            //            // }
            //            $documents_path = 'documents';
            //            if (!is_dir($documents_path)) {
            //                mkdir($documents_path);
            //                chmod($documents_path, 0777);
            //            }
            //            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'vc';
            //            if (!is_dir($module_path)) {
            //                mkdir($module_path);
            //                chmod($module_path, 0777);
            //            }
            //            $this->load->library('upload');
            //            $temp_filename = str_replace('_', '', $_FILES['receipt_of_last_years_house_tax_for_vc']['name']);
            //            $filename = 'vc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //            //Change file name
            //            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //            if (!move_uploaded_file($_FILES['receipt_of_last_years_house_tax_for_vc']['tmp_name'], $final_path)) {
            //                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //                return;
            //            }
            //            $vc_data['receipt_of_last_years_house_tax'] = $filename;
            //        }

            $this->db->trans_start();
            //$vc_data['user_id'] = $user_id;
            //$vc_data['status'] = $module_type;
            if (!$vc_id || $vc_id == NULL) {
                $vc_data['created_by'] = $user_id;
                $vc_data['created_time'] = date('Y-m-d H:i:s');
                $vc_id = $this->utility_model->insert_data('vc', $vc_data);
            } else {
                $vc_data['updated_by'] = $user_id;
                $vc_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('vc_id', $vc_id, 'vc', $vc_data);
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

    function _get_post_data_for_vc() {
        $vc_data = array();
        $vc_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $vc_data['house_no'] = get_from_post('house_no');
        $vc_data['ward_no'] = get_from_post('ward_no');
        $vc_data['village'] = get_from_post('village');
        $vc_data['panchayat_or_dmc'] = get_from_post('panchayat_or_dmc');
        $vc_data['application_category'] = get_from_post('application_category');
        $vc_data['house_ownership'] = get_from_post('house_ownership');
        $vc_data['vc_type'] = get_from_post('vc_type');
        $vc_data['diameter_service_connection'] = get_from_post('diameter_service_connection');
        $vc_data['water_meter'] = get_from_post('water_meter');
        $vc_data['district'] = get_from_post('district');
        $vc_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        return $vc_data;
    }

    function _check_validation_for_vc($vc_data) {
        if (!$vc_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$vc_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$vc_data['house_no']) {
            return HOUSE_NO_MESSAGE;
        }
        if (!$vc_data['ward_no']) {
            return WARD_NO_MESSAGE;
        }
        if (!$vc_data['village']) {
            return VILLAGE_MESSAGE;
        }
        if (!$vc_data['panchayat_or_dmc']) {
            return PANCHAYT_OR_DMC_MESSAGE;
        }
        if (!$vc_data['application_category']) {
            return APPLICANT_CATEGORY_WC_MESSAGE;
        }
        if (!$vc_data['house_ownership']) {
            return HOUSE_OWNERSHIP_MESSAGE;
        }
        if (!$vc_data['vc_type']) {
            return WC_TYPE_MESSAGE;
        }
        if (!$vc_data['diameter_service_connection']) {
            return DIAMETER_SERVICE_CONNECTION_MESSAGE;
        }
        if (!$vc_data['water_meter']) {
            return WATER_METER_MESSAGE;
        }
        if (!$vc_data['district']) {
            return DISTRICT_MESSAGE;
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
            $vc_id = get_from_post('vc_id');
            $document_type = get_from_post('document_type');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$vc_id || $vc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('vc_id', $vc_id, 'vc');
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
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'vc' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['receipt_of_last_years_house_tax'];
            } else if ($document_type == 2) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'vc' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];
            }

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            if ($document_type == VALUE_ONE) {
                $this->utility_model->update_data('vc_id', $vc_id, 'vc', array('receipt_of_last_years_house_tax' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            } else if ($document_type == VALUE_TWO) {
                $this->utility_model->update_data('vc_id', $vc_id, 'vc', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $vc_id = get_from_post('vc_id_for_vc_form1');
            if (!is_post() || $user_id == null || !$user_id || $vc_id == null || !$vc_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_vc_data = $this->utility_model->get_by_id('vc_id', $vc_id, 'vc');

            if (empty($existing_vc_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('vc_data' => $existing_vc_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('vc/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_vc_data_by_vc_id() {
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
            $vc_id = get_from_post('vc_id');
            if (!$vc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $vc_data = $this->utility_model->get_by_id_with_applicant_name('vc_id', $vc_id, 'vc');
            if (empty($vc_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTYEIGHT, 'fees_bifurcation', 'module_id', $vc_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FOURTYEIGHT, $vc_id);
                }
                if ($vc_data['status'] != VALUE_FOUR && $vc_data['status'] != VALUE_FIVE &&
                        $vc_data['status'] != VALUE_SIX && $vc_data['status'] != VALUE_SEVEN &&
                        $vc_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($vc_data['status'] != VALUE_ELEVEN) {
                            $vc_data['show_remove_upload_btn'] = true;
                        }
                        $vc_data['show_dropdown'] = true;
                        $vc_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTYEIGHT, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['vc_data'] = $vc_data;
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
            $vc_id = get_from_post('vc_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$vc_id || $vc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('vc_id', $vc_id, 'vc');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'vc' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('vc_id', $vc_id, 'vc', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $vc_id = get_from_post('vc_id_for_vc_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $vc_id == NULL || !$vc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_vc_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $vc_data = array();
            if ($_FILES['challan_for_vc_upload_challan']['name'] != '') {
                $main_path = 'documents/vc';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'vc';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_vc_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_vc_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $vc_data['challan'] = $filename;
                $vc_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $vc_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $vc_data['status'] = VALUE_NINE;
            }
            $vc_data['payment_type'] = $payment_type;
            $vc_data['updated_by'] = $user_id;
            $vc_data['updated_time'] = date('Y-m-d H:i:s');
            $vc_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FOURTYEIGHT, $vc_id, $user_id, $vc_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FOURTYEIGHT, 'fees_bifurcation', $update_data, 'module_id', $vc_id);
            }

            $this->utility_model->update_data('vc_id', $vc_id, 'vc', $vc_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $vc_data['total_fees'];
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
            $vc_id = get_from_post('vc_id_for_vc_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$vc_id || $vc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_vc_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_vc_approve');
            $update_data['remarks'] = get_from_post('remarks_for_vc_approve');
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
            $ex_data = $this->utility_model->get_by_id('vc_id', $vc_id, 'vc');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYEIGHT, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('vc_id', $vc_id, 'vc', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FOURTYEIGHT, $vc_id);

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
            $vc_id = get_from_post('vc_id_for_vc_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$vc_id || $vc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_vc_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('vc_id', $vc_id, 'vc');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYEIGHT, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('vc_id', $vc_id, 'vc', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FOURTYEIGHT, $vc_id);

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
            $vc_id = get_from_post('vc_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $vc_id == null || !$vc_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_vc_data = $this->utility_model->get_by_id('vc_id', $vc_id, 'vc');
            if (empty($existing_vc_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_vc_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('vc_data' => $existing_vc_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('vc/certificate', $data, TRUE));
            $mpdf->Output('vc_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->vc_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Vc_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Applicant / Premises Name',
                'Address', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FOURTYEIGHT]) ? $prefix_module_array[VALUE_FOURTYEIGHT] : '';
                    $list['vc_id'] = generate_registration_number($prefix, $list['vc_id']);
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