<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Boilermanufacture extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('boiler_manufacture_model');
        $this->load->model('utility_model');
    }

    function get_boiler_manufacture_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['boiler_manufacture_data'] = array();
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
            $success_array['boiler_manufacture_data'] = $this->boiler_manufacture_model->get_all_boiler_manufacture_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->boiler_manufacture_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->boiler_manufacture_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['boiler_manufacture_data'], VALUE_THIRTYEIGHT);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['boiler_manufacture_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['boiler_manufacture_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_boiler_manufacture_data_by_id() {
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
            $boiler_manufacture_id = get_from_post('boilermanufacture_id');
            if (!$boiler_manufacture_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $this->db->trans_start();
            $boiler_manufacture_data = $this->utility_model->get_by_id('boilermanufacture_id', $boiler_manufacture_id, 'boilermanufactures');
            if (empty($boiler_manufacture_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array['boiler_manufacture_data'] = $boiler_manufacture_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_boiler_manufacture() {
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
            $boilermanufacture_id = get_from_post('boilermanufacture_id');
            $boiler_manufacture_data = $this->_get_post_data_for_boiler_manufacture();
            $validation_message = $this->_check_validation_for_boiler_manufacture($boiler_manufacture_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            $image_validation_message = $this->image_validation('temp_copy_of_noc', 'copy_of_noc');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }
            $image_validation_message = $this->image_validation('temp_plan_of_workshop', 'plan_of_workshop');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }
            $image_validation_message = $this->image_validation('temp_signature_and_seal', 'signature_and_seal');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }

            $weldersData = $this->input->post('welders_data');
            $welders_decode_Data = json_decode($weldersData, true);
            if ($weldersData == "" || empty($welders_decode_Data)) {
                echo json_encode(get_error_array('Enter Atlist One Welders Info'));
                return false;
            }

            $technicalPersonData = $this->input->post('technical_person_data');
            $technical_person_decode_Data = json_decode($technicalPersonData, true);
            if ($technicalPersonData == "" || empty($technical_person_decode_Data)) {
                echo json_encode(get_error_array('Enter Atlist One Supervisor Staff Data'));
                return false;
            }



            $this->db->trans_start();
            $boiler_manufacture_data['welders_info'] = $weldersData;
            $boiler_manufacture_data['technical_personnel_info'] = $technicalPersonData;
            //$boiler_manufacture_data['status'] = get_from_post('form_status');
            //$boiler_manufacture_data['user_id'] = $user_id;
            //$boiler_manufacture_data['status'] = $module_type;
            if (!$boilermanufacture_id || $boilermanufacture_id == NULL) {
                $boilermanufacture_id = $this->utility_model->insert_data('boilermanufactures', $boiler_manufacture_data);
            } else {
                $boiler_manufacture_data['updated_by'] = $user_id;
                $boiler_manufacture_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures', $boiler_manufacture_data);
            }
            $this->_update_image($user_id, $boilermanufacture_id, $boiler_manufacture_data, 'temp_copy_of_noc', 'copy_of_noc', 'copy_of_noc');
            $this->_update_image($user_id, $boilermanufacture_id, $boiler_manufacture_data, 'temp_plan_of_workshop', 'plan_of_workshop', 'plan_of_workshop');
            $this->_update_image($user_id, $boilermanufacture_id, $boiler_manufacture_data, 'temp_signature_and_seal', 'signature_and_seal', 'signature_and_seal');

            // foreach ($technical_person_decode_Data as &$value) {
            //     $this->_update_image($user_id, $boilermanufacture_id, $boiler_manufacture_data, 'temp_welders_certificate', 'welders_certificate', 'welders_certificate');
            // }

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            //$success_array['message'] = FACTORY_LICENSE_SAVED_MESSAGE;
            $success_array['message'] = $module_type == VALUE_ONE ? APP_DRAFT_MESSAGE : APP_SUBMITTED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_boiler_manufacture() {
        $boiler_manufacture_data = array();
        $boiler_manufacture_data['district'] = get_from_post('district');
        $boiler_manufacture_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $boiler_manufacture_data['name_of_firm'] = get_from_post('name_of_firm');
        $boiler_manufacture_data['address_of_workshop'] = get_from_post('address_of_workshop');
        $boiler_manufacture_data['address_of_communication'] = get_from_post('address_of_communication');
        $boiler_manufacture_data['type_of_jobs'] = get_from_post('type_of_jobs');
        $boiler_manufacture_data['tools_and_tackles'] = get_from_post('tools_and_tackles');
        $boiler_manufacture_data['standard_of_work'] = get_from_post('standard_of_work');
        $boiler_manufacture_data['controversial_issue'] = get_from_post('controversial_issue');
        $boiler_manufacture_data['power_sanction'] = get_from_post('power_sanction');
        $boiler_manufacture_data['conversant_with_boiler'] = get_from_post('conversant_with_boiler');
        $boiler_manufacture_data['testing_facility'] = get_from_post('testing_facility');
        $boiler_manufacture_data['recording_system'] = get_from_post('recording_system');
        $boiler_manufacture_data['is_internal_quality_control'] = get_from_post('is_internal_quality_control');
        if (get_from_post('is_internal_quality_control') == IS_CHECKED_YES) {
            $boiler_manufacture_data['quality_control_detail'] = get_from_post('quality_control_detail');
        }
        $boiler_manufacture_data['is_instruments_calibrated'] = get_from_post('is_instruments_calibrated');
        if (get_from_post('is_instruments_calibrated') == IS_CHECKED_YES) {
            $boiler_manufacture_data['instruments_calibrate_detail'] = get_from_post('instruments_calibrate_detail');
        }

        return $boiler_manufacture_data;
    }

    function _check_validation_for_boiler_manufacture($boiler_manufacture_data) {
        if (!$boiler_manufacture_data['district']) {
            return SELECT_DISTRICT;
        }
        if (!$boiler_manufacture_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$boiler_manufacture_data['name_of_firm']) {
            return FIRM_NAME_MESSAGE;
        }
        if (!$boiler_manufacture_data['address_of_workshop']) {
            return WORKSHOP_ADDRESS_MESSAGE;
        }
        if (!$boiler_manufacture_data['address_of_communication']) {
            return COMM_ADDRESS_MESSAGE;
        }
        if (!$boiler_manufacture_data['type_of_jobs']) {
            return JOB_TYPE_MESSAGE;
        }
        if (!$boiler_manufacture_data['tools_and_tackles']) {
            return TOOLS_MESSAGE;
        }
        if (!$boiler_manufacture_data['standard_of_work']) {
            return STANDARD_WORK_MESSAGE;
        }
        if (!$boiler_manufacture_data['controversial_issue']) {
            return CONTROVERSIAL_ISSUE_MESSAGE;
        }
        if (!$boiler_manufacture_data['power_sanction']) {
            return POWER_SANCTION_MESSAGE;
        }
        if (!$boiler_manufacture_data['conversant_with_boiler']) {
            return CONVERSANT_MESSAGE;
        }
        if (!$boiler_manufacture_data['testing_facility']) {
            return TESTING_FACILITY_MESSAGE;
        }
        if (!$boiler_manufacture_data['recording_system']) {
            return RECORD_SYSTEM_MESSAGE;
        }
        if ($boiler_manufacture_data['is_internal_quality_control'] == IS_CHECKED_YES) {
            if (!$boiler_manufacture_data['quality_control_detail']) {
                return QUALITY_CONTROL_MESSAGE;
            }
        }
        if ($boiler_manufacture_data['is_instruments_calibrated'] == IS_CHECKED_YES) {
            if (!$boiler_manufacture_data['instruments_calibrate_detail']) {
                return INSTRUMENT_CALIBRATE_MESSAGE;
            }
        }

        return '';
    }

    function _update_image($user_id, $boiler_manufacture_id, &$boiler_manufacture_data, $is_exists_doc, $post_filename, $db_field_name) {
        $form_application_data = array();
        $temp_existing_doc_name = get_from_post($is_exists_doc);
        if (!$temp_existing_doc_name) {
            $this->load->library('upload');
            $documents_path = 'documents';
            if (!is_dir($documents_path)) {
                mkdir($documents_path);
                chmod($documents_path, 0777);
            }
            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'boilermanufacture';
            if (!is_dir($module_path)) {
                mkdir($module_path);
                chmod($module_path, 0777);
            }
            $upload_doc_path = $module_path . DIRECTORY_SEPARATOR . $boiler_manufacture_id;
            if (!is_dir($upload_doc_path)) {
                mkdir($upload_doc_path);
                chmod($upload_doc_path, 0777);
            }

            $filename = $_FILES[$post_filename]['name'];
            if (!empty($filename)) {
                //Change file name
                $new_name = preg_replace('/\s/', '_', generate_random_string(30));
                $final_path = $upload_doc_path . DIRECTORY_SEPARATOR . $new_name;
                $form_application_data[$db_field_name] = $new_name;
                $boiler_manufacture_data[$db_field_name] = $new_name;
            }
        }
        $form_application_data['updated_by'] = $user_id;
        $form_application_data['updated_time'] = date('Y-m-d H:i:s');
        $this->utility_model->update_data('boilermanufacture_id', $boiler_manufacture_id, 'boilermanufactures', $form_application_data);

        if (!empty($filename)) {
            if (!$temp_existing_doc_name) {
                //Upload image
                move_uploaded_file($_FILES[$post_filename]['tmp_name'], $final_path);
            }
        }
    }

    function image_validation($is_exists_doc, $post_filename) {
        $temp_existing_doc_name = get_from_post($is_exists_doc);
        if (!$temp_existing_doc_name) {
            $allowed = array('pdf', 'png', 'jpg', 'jpeg');
            //  $filename = $_FILES['upload_file_for_uploads']['name'];
            $filename = $_FILES[$post_filename]['name'];
            $invalid_image_error_message = 'Please upload Copies of single pdf with multiple pages: <b> ' . join(', ', $allowed) . ' </b> only.';
//            if (!$filename) {
//                return $invalid_image_error_message;
//            }

            if ($filename != '') {
                $ext = pathinfo($filename, PATHINFO_EXTENSION);
                if (!in_array($ext, $allowed)) {
                    return $invalid_image_error_message;
                }
                if ((($_FILES[$post_filename]['size'] / 1024) / 1024) > MAX_FILE_SIZE_IN_MB) {
                    return 'Maximum upload size ' . MAX_FILE_SIZE_IN_MB . ' mb only.';
                    die;
                }
            }
        }
    }

    function delete_upload_file_for_boiler_manufacture() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $boiler_manufacture_id = get_from_post('boilermanufacture_id');
            $dbFileNameField = get_from_post('dbFileNameField');
            if (!is_post() || $user_id == NULL || !$user_id || $boiler_manufacture_id == NULL || !$boiler_manufacture_id || $dbFileNameField == NULL || !$dbFileNameField) {
                echo json_encode(get_error_array('Invalid Access'));
                return false;
            }
            $this->db->trans_start();
            $existing_application_data = $this->utility_model->get_by_id('boilermanufacture_id', $boiler_manufacture_id, 'boilermanufactures');
            if (empty($existing_application_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            //document_file
            move_image($dbFileNameField, $existing_application_data, "documents/boilermanufacture/$boiler_manufacture_id", 'garbage');

            $application_data = array();
            $application_data[$dbFileNameField] = '';
            $application_data['updated_by'] = $user_id;
            $application_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('boilermanufacture_id', $boiler_manufacture_id, 'boilermanufactures', $application_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $application_data[$dbFileNameField] = '';
            $success_array = get_success_array();
            $success_array['message'] = 'Attached Document Removed Successfully !';
            $success_array['upload_file_for_boiler_manufacture'] = $application_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function generate_form1() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $boilermanufacture_id = get_from_post('boilermanufacture_id_for_boilermanufacture_form1');
            if (!is_post() || $user_id == null || !$user_id || $boilermanufacture_id == null || !$boilermanufacture_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_boiler_manufacture_data = $this->utility_model->get_by_id('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures');

            if (empty($existing_boiler_manufacture_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('boilermanufactures_data' => $existing_boiler_manufacture_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('boilermanufacture/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_boilermanufacture_data_by_boilermanufacture_id() {
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
            $boilermanufacture_id = get_from_post('boilermanufacture_id');
            if (!$boilermanufacture_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $boilermanufactures_data = $this->utility_model->get_by_id_with_applicant_name('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures');
            if (empty($boilermanufactures_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_THIRTYEIGHT, 'fees_bifurcation', 'module_id', $boilermanufacture_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_THIRTYEIGHT, $boilermanufacture_id);
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['boilermanufactures_data'] = $boilermanufactures_data;
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
            $boilermanufacture_id = get_from_post('boilermanufacture_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$boilermanufacture_id || $boilermanufacture_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'boilermanufactures' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $boilermanufacture_id = get_from_post('boilermanufacture_id_for_boiler_manufacture_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $boilermanufacture_id == NULL || !$boilermanufacture_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_boiler_manufacture_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $boiler_manufacture_data = array();
            if ($_FILES['challan_for_boiler_manufacture_upload_challan']['name'] != '') {
                $main_path = 'documents/boilermanufactures';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'boilermanufactures';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_boiler_manufacture_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_boiler_manufacture_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $boiler_manufacture_data['challan'] = $filename;
                $boiler_manufacture_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $boiler_manufacture_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $boiler_manufacture_data['status'] = VALUE_NINE;
            }
            $boiler_manufacture_data['payment_type'] = $payment_type;
            $boiler_manufacture_data['updated_by'] = $user_id;
            $boiler_manufacture_data['updated_time'] = date('Y-m-d H:i:s');
            $boiler_manufacture_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_THIRTYEIGHT, $boilermanufacture_id, $user_id, $boiler_manufacture_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_THIRTYEIGHT, 'fees_bifurcation', $update_data, 'module_id', $boilermanufacture_id);
            }

            $this->utility_model->update_data('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures', $boiler_manufacture_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $boiler_manufacture_data['total_fees'];
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
            $boilermanufacture_id = get_from_post('boiler_manufacture_id_for_boiler_manufacture_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$boilermanufacture_id || $boilermanufacture_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_boiler_manufacture_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_boiler_manufacture_approve');
            $update_data['remarks'] = get_from_post('remarks_for_boiler_manufacture_approve');
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
            $existing_boilermanufactures_data = $this->utility_model->check_registration_number('registration_number', $update_data['registration_number'], 'boilermanufactures');
            if (is_array($existing_boilermanufactures_data)) {
                if (count(array($existing_boilermanufactures_data)) > 0) {
                    echo json_encode(get_error_array(REGISTRATION_NUMBER_EXISTS_MESSAGE));
                    return false;
                }
            }
            $update_data['valid_upto'] = convert_to_mysql_date_format($update_data['valid_upto']);
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYEIGHT, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_THIRTYEIGHT, $boilermanufacture_id);
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
            $boilermanufacture_id = get_from_post('boiler_manufacture_id_for_boiler_manufacture_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$boilermanufacture_id ||
                    $boilermanufacture_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_boiler_manufacture_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYEIGHT, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_THIRTYEIGHT, $boilermanufacture_id);
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
            $boilermanufacture_id = get_from_post('boilermanufacture_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $boilermanufacture_id == null || !$boilermanufacture_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_boiler_manufacture_data = $this->utility_model->get_by_id('boilermanufacture_id', $boilermanufacture_id, 'boilermanufactures');
            if (empty($existing_boiler_manufacture_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_boiler_manufacture_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('boiler_manufacture_data' => $existing_boiler_manufacture_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('boilermanufacture/certificate', $data, TRUE));
            $mpdf->Output('Boilermanufacture_certificate_' . time() . '.pdf', 'D');
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
            $excel_data = $this->boiler_manufacture_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Boiler_Manufactures_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Firm Name',
                'Type Of Job', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_THIRTYEIGHT]) ? $prefix_module_array[VALUE_THIRTYEIGHT] : '';
                    $list['boilermanufacture_id'] = generate_registration_number($prefix, $list['boilermanufacture_id']);
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