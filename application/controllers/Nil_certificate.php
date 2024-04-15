<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Nil_certificate extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('nil_certificate_model');
    }

    function get_nil_certificate_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['nil_certificate_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $columns = $this->input->post('columns');
            if (is_admin() || is_view_all_district_user()) {
                $search_district = trim($columns[1]['search']['value']);
                $new_s_district = get_from_post('search_district');
                $search_district = $new_s_district != '' ? $new_s_district : $search_district;
            } else {
                $search_district = $session_district;
            }
            $search_eet = trim($columns[3]['search']['value']);
            $search_logged_user_detail = trim($columns[2]['search']['value']);
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
            $success_array['nil_certificate_data'] = $this->nil_certificate_model->get_all_nil_certificate_list($start, $length, $search_district, $search_eet, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->nil_certificate_model->get_total_count_of_records($search_district);
            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_eet || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->nil_certificate_model->get_filter_count_of_records($search_district, $search_eet, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['nil_certificate_data'], VALUE_SIXTYONE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['nil_certificate_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['nil_certificate_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_nil_certificate_data_by_id() {
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
            $nil_certificate_id = get_from_post('nil_certificate_id');
            if (!$nil_certificate_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $nil_certificate_data = $this->utility_model->get_by_id('nil_certificate_id', $nil_certificate_id, 'nil_certificate');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if (empty($nil_certificate_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $nil_certificate_data['m_doc'] = generate_array_for_id_object($this->utility_model->get_result_data_by_id('module_type', VALUE_SIXTYONE, 'module_documents', 'module_id', $nil_certificate_id), 'doc_id');
            $nil_certificate_data['m_other_doc'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_SIXTYONE, 'module_other_documents', 'module_id', $nil_certificate_id);
            $success_array['nil_certificate_data'] = $nil_certificate_data;
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
            $nil_certificate_id = get_from_post('nil_certificate_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$nil_certificate_id || $nil_certificate_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('nil_certificate_id', $nil_certificate_id, 'nil_certificate');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'nil_certificate' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('nil_certificate_id', $nil_certificate_id, 'nil_certificate', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $nil_certificate_id = get_from_post('nil_certificate_id_for_nil_certificate_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $nil_certificate_id == NULL || !$nil_certificate_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_nil_certificate_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $nil_certificate_data = array();
            if ($_FILES['challan_for_nil_certificate_upload_challan']['name'] != '') {
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'nil_certificate';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_nil_certificate_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $module_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_nil_certificate_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $nil_certificate_data['challan'] = $filename;
                $nil_certificate_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $nil_certificate_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $nil_certificate_data['status'] = VALUE_NINE;
            }
            $nil_certificate_data['payment_type'] = $payment_type;
            $nil_certificate_data['updated_by'] = $user_id;
            $nil_certificate_data['updated_time'] = date('Y-m-d H:i:s');
            $nil_certificate_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_SIXTYONE, $nil_certificate_id, $user_id, $nil_certificate_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_SIXTYONE, 'fees_bifurcation', $update_data, 'module_id', $nil_certificate_id);
            }

            $this->utility_model->update_data('nil_certificate_id', $nil_certificate_id, 'nil_certificate', $nil_certificate_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $nil_certificate_data['total_fees'];
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
            $nil_certificate_id = get_from_post('nil_certificate_id_for_nil_certificate_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$nil_certificate_id || $nil_certificate_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_nil_certificate_approve');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(REMARKS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('nil_certificate_id', $nil_certificate_id, 'nil_certificate');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($_FILES['certificate_file_for_nil_certificate_approve']['name'] == '') {
                echo json_encode(get_error_array(UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['certificate_file_for_nil_certificate_approve']['size'];
            if ($evidence_size == 0) {
                echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $main_path = 'certificate';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $ad_path = $main_path . DIRECTORY_SEPARATOR . 'crsr';
            if (!is_dir($ad_path)) {
                mkdir($ad_path);
                chmod("$ad_path", 0755);

                $file = DIRECTORY_SEPARATOR . 'index.html';
                $temp_path = $main_path . $file;
                chmod($temp_path, 0755);
                copy($temp_path, $ad_path . $file);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['certificate_file_for_nil_certificate_approve']['name']);
            $filename = 'nil_certificatec_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $ad_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['certificate_file_for_nil_certificate_approve']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $update_data['certificate_file'] = $filename;
            $temp_fc_filename = 'temp_nil_certificatefc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            error_reporting(E_ERROR);
            $data = array('nil_certificate_data' => $ex_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('nil_certificate/qr_barcode', $data, TRUE));
            $temp_fc_path = $ad_path . DIRECTORY_SEPARATOR . $temp_fc_filename;

            // Save Temporary QR Code File
            $mpdf->Output($temp_fc_path, 'F');

            $temp_files_to_merge = array();
            array_push($temp_files_to_merge, $temp_fc_path);
            array_push($temp_files_to_merge, $final_path);
            $final_certificate_filename = 'nil_certificatefc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            $final_filepath = FCPATH . $ad_path . DIRECTORY_SEPARATOR . $final_certificate_filename;

            // Merge QR Code File with Uploaded Certificate
            merge_pdf($final_filepath, $temp_files_to_merge);

            // Remove Temporary QR Code File
            if (file_exists($temp_fc_path)) {
                unlink($temp_fc_path);
            }

            $update_data['final_certificate'] = $final_certificate_filename;
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_SIXTYONE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('nil_certificate_id', $nil_certificate_id, 'nil_certificate', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_SIXTYONE, $nil_certificate_id);

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
            $nil_certificate_id = get_from_post('nil_certificate_id_for_nil_certificate_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$nil_certificate_id || $nil_certificate_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_nil_certificate_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(REMARKS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('nil_certificate_id', $nil_certificate_id, 'nil_certificate');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_SIXTYONE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('nil_certificate_id', $nil_certificate_id, 'nil_certificate', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_SIXTYONE, $nil_certificate_id);

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

    function get_nil_certificate_data_by_nil_certificate_id() {
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
            $nil_certificate_id = get_from_post('nil_certificate_id');
            if (!$nil_certificate_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $nil_certificate_data = $this->utility_model->get_by_id_with_applicant_name('nil_certificate_id', $nil_certificate_id, 'nil_certificate');
            if (empty($nil_certificate_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_SIXTYONE, 'fees_bifurcation', 'module_id', $nil_certificate_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_SIXTYONE, $nil_certificate_id);
                }
                if ($nil_certificate_data['status'] != VALUE_FOUR && $nil_certificate_data['status'] != VALUE_FIVE &&
                        $nil_certificate_data['status'] != VALUE_SIX && $nil_certificate_data['status'] != VALUE_SEVEN &&
                        $nil_certificate_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($nil_certificate_data['status'] != VALUE_ELEVEN) {
                            $nil_certificate_data['show_remove_upload_btn'] = true;
                        }
                        $nil_certificate_data['show_dropdown'] = true;
                        $nil_certificate_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_SIXTYONE, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['nil_certificate_data'] = $nil_certificate_data;
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

    function generate_nil_certificate_excel() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == null || !$user_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $this->db->trans_start();
            $excel_data = $this->nil_certificate_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Nil_certificate_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Village / DMC Ward / SMC Ward',
                'Entity / Establishment Type', 'Registered User Name', 'Registered User Mobile Number',
                'Applicant Name', 'Applicant Address', 'Applicant Mobile Number', 'Purpose', 'Property Detail',
                'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                $daman_village_array = $this->config->item('daman_village_array');
                $diu_village_array = $this->config->item('diu_village_array');
                $dnh_village_array = $this->config->item('dnh_village_array');
                foreach ($excel_data as $list) {
                    $village_array = $list['district'] == VALUE_ONE ? $daman_village_array : ($list['district'] == VALUE_TWO ? $diu_village_array : ($list['district'] == VALUE_THREE ? $dnh_village_array : array()));
                    $prefix = isset($prefix_module_array[VALUE_SIXTYONE]) ? $prefix_module_array[VALUE_SIXTYONE] : '';
                    $list['nil_certificate_id'] = generate_registration_number($prefix, $list['nil_certificate_id']);
                    $list['district'] = isset($taluka_array[$list['district']]) ? $taluka_array[$list['district']] : '-';
                    $list['village_dmc_ward'] = isset($village_array[$list['village_dmc_ward']]) ? $village_array[$list['village_dmc_ward']] : '-';
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
 * EOF: ./application/controller/Nil_certificate.php
 */