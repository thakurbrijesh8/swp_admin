<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Ips extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('ips_model');
    }

    function get_incentives_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['incentives_data'] = array();
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
            $search_logged_user_detail = trim($columns[2]['search']['value']);
            $search_scheme_details = trim($columns[3]['search']['value']);
            $search_owner_details = trim($columns[4]['search']['value']);
            $search_manu_details = trim($columns[5]['search']['value']);
            $search_app_timing = trim($columns[6]['search']['value']);
            $search_status = trim($columns[7]['search']['value']);
            $search_query_status = trim($columns[8]['search']['value']);

            $new_s_app_timing_status = get_from_post('search_app_timing_status');
            $search_app_timing = $new_s_app_timing_status != '' ? $new_s_app_timing_status : $search_app_timing;
            $new_s_status = get_from_post('search_status');
            $search_status = $new_s_status != '' ? $new_s_status : $search_status;

            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['incentives_data'] = $this->ips_model->get_all_incentives_list($start, $length, $search_district, $search_logged_user_detail, $search_scheme_details, $search_owner_details, $search_manu_details, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->ips_model->get_total_count_of_records($search_district);
            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_logged_user_detail != '' || $search_scheme_details != '' || $search_owner_details != '' || $search_manu_details != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->ips_model->get_filter_count_of_records($search_district, $search_logged_user_detail, $search_scheme_details, $search_owner_details, $search_manu_details, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['incentives_data'], VALUE_FIFTYTWO);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['incentives_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['incentives_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_incentives_data_by_id() {
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
            $ips_incentive_id = get_from_post('ips_incentive_id');
            if (!$ips_incentive_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ips_incentive_data = $this->ips_model->get_incentive_details_by_id($ips_incentive_id);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if (empty($ips_incentive_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $inc_doc_details = generate_array_for_id_object($this->utility_model->get_result_data_by_id('ips_incentive_id', $ips_incentive_id, 'ips_incentive_doc', 'ips_id', $ips_incentive_data['ips_id']), 'doc_id');
            $inc_other_doc_details = $this->utility_model->get_result_data_by_id('ips_incentive_id', $ips_incentive_id, 'ips_incentive_od', 'ips_id', $ips_incentive_data['ips_id']);
            $success_array = get_success_array();
            $success_array['ips_incentive_data'] = $ips_incentive_data;
            $success_array['doc_details'] = $inc_doc_details;
            $success_array['other_doc_details'] = $inc_other_doc_details;
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
            $ips_incentive_id = get_from_post('ips_incentive_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$ips_incentive_id || $ips_incentive_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->ips_model->get_incentive_details_by_id($ips_incentive_id);
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'ips_inc' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('ips_incentive_id', $ips_incentive_id, 'ips_incentive', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $ips_incentive_id = get_from_post('ips_incentive_id_for_incentives_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $ips_incentive_id == NULL || !$ips_incentive_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_incentives_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $incentive_data = array();
            if ($_FILES['challan_for_incentives_upload_challan']['name'] != '') {
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'ips_inc';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_incentives_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $module_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_incentives_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $incentive_data['challan'] = $filename;
                $incentive_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $incentive_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $incentive_data['status'] = VALUE_NINE;
            }
            $incentive_data['payment_type'] = $payment_type;
            $incentive_data['updated_by'] = $user_id;
            $incentive_data['updated_time'] = date('Y-m-d H:i:s');
            $incentive_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FIFTYTWO, $ips_incentive_id, $user_id, $incentive_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FIFTYTWO, 'fees_bifurcation', $update_data, 'module_id', $ips_incentive_id);
            }

            $this->utility_model->update_data('ips_incentive_id', $ips_incentive_id, 'ips_incentive', $incentive_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $incentive_data['total_fees'];
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
            $ips_incentive_id = get_from_post('ips_incentive_id_for_incentives_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$ips_incentive_id || $ips_incentive_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_incentives_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_incentives_approve');
            $update_data['remarks'] = get_from_post('remarks_for_incentives_approve');
            if (!$update_data['registration_number']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REGISTRATION_NO_MESSAGE));
                return false;
            }
            if (!$update_data['valid_upto']) {
                echo json_encode(get_error_array(DATE_MESSAGE));
                return false;
            }
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(REMARKS_MESSAGE));
                return false;
            }
            $update_data['valid_upto'] = convert_to_mysql_date_format($update_data['valid_upto']);
            $this->db->trans_start();
            $ex_data = $this->ips_model->get_incentive_details_by_id($ips_incentive_id);
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($_FILES['certificate_file_for_incentives_approve']['name'] == '') {
                echo json_encode(get_error_array(UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['certificate_file_for_incentives_approve']['size'];
            if ($evidence_size == 0) {
                echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $main_path = 'certificate';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $ad_path = $main_path . DIRECTORY_SEPARATOR . 'dic';
            if (!is_dir($ad_path)) {
                mkdir($ad_path);
                chmod("$ad_path", 0755);

                $file = DIRECTORY_SEPARATOR . 'index.html';
                $temp_path = $main_path . $file;
                chmod($temp_path, 0755);
                copy($temp_path, $ad_path . $file);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['certificate_file_for_incentives_approve']['name']);
            $filename = 'ips_inc_c_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $ad_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['certificate_file_for_incentives_approve']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $update_data['certificate_file'] = $filename;
            $temp_fc_filename = 'temp_ips_inc_fc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            error_reporting(E_ERROR);
            $data = array('incentive_data' => $ex_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('ips/inc_qr_barcode', $data, TRUE));
            $temp_fc_path = $ad_path . DIRECTORY_SEPARATOR . $temp_fc_filename;

            // Save Temporary QR Code File
            $mpdf->Output($temp_fc_path, 'F');

            $temp_files_to_merge = array();
            array_push($temp_files_to_merge, $temp_fc_path);
            array_push($temp_files_to_merge, $final_path);
            $final_certificate_filename = 'incentivesfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            $final_filepath = FCPATH . $ad_path . DIRECTORY_SEPARATOR . $final_certificate_filename;

            // Merge QR Code File with Uploaded Certificate
            merge_pdf($final_filepath, $temp_files_to_merge);

            // Remove Temporary QR Code File
            if (file_exists($temp_fc_path)) {
                unlink($temp_fc_path);
            }

            $update_data['final_certificate'] = $final_certificate_filename;
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FIFTYTWO, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('ips_incentive_id', $ips_incentive_id, 'ips_incentive', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FIFTYTWO, $ips_incentive_id);

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
            $ips_incentive_id = get_from_post('ips_incentive_id_for_incentives_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$ips_incentive_id || $ips_incentive_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_incentives_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(REMARKS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->ips_model->get_incentive_details_by_id($ips_incentive_id);
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FIFTYTWO, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('ips_incentive_id', $ips_incentive_id, 'ips_incentive', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FIFTYTWO, $ips_incentive_id);

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

    function get_incentive_data_by_ips_incentive_id() {
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
            $ips_incentive_id = get_from_post('ips_incentive_id');
            if (!$ips_incentive_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $incentive_data = $this->ips_model->get_incentive_details_by_id($ips_incentive_id);
            if (empty($incentive_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FIFTYTWO, 'fees_bifurcation', 'module_id', $ips_incentive_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FIFTYTWO, $ips_incentive_id);
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['incentive_data'] = $incentive_data;
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

    function generate_certificate() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $ips_incentive_id = get_from_post('ips_incentive_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $ips_incentive_id == null || !$ips_incentive_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_incentive_data = $this->ips_model->get_incentive_details_by_id($ips_incentive_id);
            if (empty($existing_incentive_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_incentive_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('incentive_data' => $existing_incentive_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('ips/inc_certificate', $data, TRUE));
            $mpdf->Output('Ips_certificate_' . time() . '.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function generate_incentives_excel() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == null || !$user_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $this->db->trans_start();
            $excel_data = $this->ips_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=IPS_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Applicant Name', 'Mobile Number', 'Scheme Type',
                'Scheme Name', 'Name of Owner', 'Email of Owner', 'Mobile Number of Owner', 'Name of Manufacturing Unit / Service Unit',
                'Main Unit/Plant Address', 'Office Address', 'Submitted On', 'Status', 'Query Status',
                'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $scheme_type_array = $this->config->item('scheme_type_array');
                $scheme_array = $this->config->item('scheme_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FIFTYTWO]) ? $prefix_module_array[VALUE_FIFTYTWO] : '';
                    $list['ips_incentive_id'] = generate_registration_number($prefix, $list['ips_incentive_id']);
                    $list['district'] = isset($taluka_array[$list['district']]) ? $taluka_array[$list['district']] : '-';
                    $list['scheme_type'] = isset($scheme_type_array[$list['scheme_type']]) ? $scheme_type_array[$list['scheme_type']] : '';
                    $list['scheme'] = isset($scheme_array[$list['scheme']]) ? $scheme_array[$list['scheme']] : '';
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