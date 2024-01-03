<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Buildingplan extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('building_plan_model');
    }

    function get_building_plan_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['building_plan_data'] = array();
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
            $success_array['building_plan_data'] = $this->building_plan_model->get_all_building_plan_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->building_plan_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->building_plan_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['building_plan_data'], VALUE_THIRTYSIX);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['building_plan_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['building_plan_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_building_plan_data_by_id() {
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
            $building_plan_id = get_from_post('buildingplan_id');
            if (!$building_plan_id) {
                echo json_encode(get_error_array(INVALID_USER_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $this->db->trans_start();
            $building_plan_data = $this->building_plan_model->get_building_plan_by_id($building_plan_id);
            if (empty($building_plan_data)) {
                echo json_encode(get_error_array(INVALID_USER_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array['building_plan_data'] = $building_plan_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_building_plan() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $module_type = get_from_post('module_type');
            if (!is_post() || $user_id == NULL || !$user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $buildingplan_id = get_from_post('buildingplan_id');
            $building_plan_data = $this->_get_post_data_for_building_plan();
            $validation_message = $this->_check_validation_for_building_plan($building_plan_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }


            $this->db->trans_start();
            //$building_plan_data['status'] = get_from_post('form_status');
            //$building_plan_data['user_id'] = $user_id;
            //$buildingplan_id = $this->building_plan_model->insert_building_plan($building_plan_data);
            if (!$buildingplan_id || $buildingplan_id == NULL) {
                $buildingplan_id = $this->utility_model->insert_data('buildingplan', $building_plan_data);
            } else {
                $building_plan_data['updated_by'] = $user_id;
                $building_plan_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('buildingplan_id', $buildingplan_id, 'buildingplan', $building_plan_data);
            }

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

    function update_building_plan() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $building_plan_id = get_from_post('buildingplan_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$building_plan_id || $building_plan_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $building_plan_data = $this->_get_post_data_for_building_plan();
            $validation_message = $this->_check_validation_for_building_plan($building_plan_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $this->db->trans_start();
            $check_user = $this->building_plan_model->get_building_plan_by_id($building_plan_id);
            if (empty($check_user)) {
                echo json_encode(get_error_array(INVALID_USER_MESSAGE));
                return;
            }

            $image_validation_message = $this->image_validation('temp_upload_flow_chart', 'upload_flow_chart');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }
            $image_validation_message = $this->image_validation('temp_upload_site_plan', 'upload_site_plan');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }
            $image_validation_message = $this->image_validation('temp_upload_elevation_document', 'upload_elevation_document');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }
            $image_validation_message = $this->image_validation('temp_sign_of_applicant', 'sign_of_applicant');
            if ($image_validation_message != '') {
                echo json_encode(get_error_array($image_validation_message));
                return false;
            }


            //$building_plan_data['status'] = get_from_post('form_status');
            $building_plan_data['user_id'] = $session_user_id;
            $building_plan_data['updated_by'] = $session_user_id;
            $building_plan_data['updated_time'] = date('Y-m-d H:i:s');
            $this->building_plan_model->update_building_plan($building_plan_id, $building_plan_data);
            $this->_update_image($session_user_id, $building_plan_id, $building_plan_data, 'temp_upload_flow_chart', 'upload_flow_chart', 'upload_flow_chart');
            $this->_update_image($session_user_id, $building_plan_id, $building_plan_data, 'temp_upload_site_plan', 'upload_site_plan', 'upload_site_plan');
            $this->_update_image($session_user_id, $building_plan_id, $building_plan_data, 'temp_upload_elevation_document', 'upload_elevation_document', 'upload_elevation_document');
            $this->_update_image($session_user_id, $building_plan_id, $building_plan_data, 'temp_sign_of_applicant', 'sign_of_applicant', 'sign_of_applicant');

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = FACTORY_LICENSE_UPDATED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_building_plan() {
        $building_plan_data = array();
        $building_plan_data['district'] = get_from_post('district');
        $building_plan_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $building_plan_data['applicant_name'] = get_from_post('applicant_name');
        $building_plan_data['applicant_phoneno'] = get_from_post('applicant_phoneno');
        $building_plan_data['email'] = get_from_post('email');
        $building_plan_data['applicant_address'] = get_from_post('applicant_address');
        $building_plan_data['factory_name'] = get_from_post('factory_name');
        $building_plan_data['factory_building'] = get_from_post('factory_building');
        $building_plan_data['factory_streetno'] = get_from_post('factory_streetno');
        $building_plan_data['factory_city'] = get_from_post('factory_city');
        $building_plan_data['factory_pincode'] = get_from_post('factory_pincode');
        $building_plan_data['factory_district'] = get_from_post('factory_district');
        $building_plan_data['factory_town'] = get_from_post('factory_town');
        $building_plan_data['nearest_police_station'] = get_from_post('nearest_police_station');
        $building_plan_data['nrearest_railway_station'] = get_from_post('nrearest_railway_station');
        $building_plan_data['particulars_of_plant'] = get_from_post('particulars_of_plant');

        return $building_plan_data;
    }

    function _check_validation_for_building_plan($building_plan_data) {
        if (!$building_plan_data['district']) {
            return SELECT_DISTRICT;
        }
        if (!$building_plan_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$building_plan_data['applicant_name']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$building_plan_data['applicant_phoneno']) {
            return APPLICANT_PHNO_MESSAGE;
        }
        if (!$building_plan_data['email']) {
            return APPLICANT_EMAIL_MESSAGE;
        }
        if (!$building_plan_data['applicant_address']) {
            return FACTORY_ADDRESS_MESSAGE;
        }
        if (!$building_plan_data['factory_name']) {
            return FACTORY_NAME_MESSAGE;
        }
        if (!$building_plan_data['factory_building']) {
            return FACTORY_BUILDING_MESSAGE;
        }
        if (!$building_plan_data['factory_streetno']) {
            return FACTORY_SECTOR_MESSAGE;
        }
        if (!$building_plan_data['factory_city']) {
            return FACTORY_CITY_MESSAGE;
        }
        if (!$building_plan_data['factory_pincode']) {
            return FACTORY_PINCODE_MESSAGE;
        }
        if (!$building_plan_data['factory_district']) {
            return FACTORY_DISTRICT_MESSAGE;
        }
        if (!$building_plan_data['factory_town']) {
            return FACTORY_TOWN_MESSAGE;
        }
        if (!$building_plan_data['nearest_police_station']) {
            return POLICE_STATION_MESSAGE;
        }
        if (!$building_plan_data['nrearest_railway_station']) {
            return RAILWAY_STATION_MESSAGE;
        }
        if (!$building_plan_data['particulars_of_plant']) {
            return PLAN_MESSAGE;
        }

        return '';
    }

    function _update_image($user_id, $building_plan_id, &$building_plan_data, $is_exists_doc, $post_filename, $db_field_name) {
        $form_application_data = array();
        $temp_existing_doc_name = get_from_post($is_exists_doc);
        if (!$temp_existing_doc_name) {
            $this->load->library('upload');
            $documents_path = 'documents';
            if (!is_dir($documents_path)) {
                mkdir($documents_path);
                chmod($documents_path, 0777);
            }
            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'buildingplan';
            if (!is_dir($module_path)) {
                mkdir($module_path);
                chmod($module_path, 0777);
            }
            $upload_doc_path = $module_path . DIRECTORY_SEPARATOR . $building_plan_id;
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
                $building_plan_data[$db_field_name] = $new_name;
            }
        }
        $form_application_data['updated_by'] = $user_id;
        $form_application_data['updated_time'] = date('Y-m-d H:i:s');
        $this->building_plan_model->update_building_plan($building_plan_id, $form_application_data);

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

    function delete_upload_file_for_building_plan() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $building_plan_id = get_from_post('buildingplan_id');
            $dbFileNameField = get_from_post('dbFileNameField');
            if (!is_post() || $user_id == NULL || !$user_id || $building_plan_id == NULL || !$building_plan_id || $dbFileNameField == NULL || !$dbFileNameField) {
                echo json_encode(get_error_array('Invalid Access'));
                return false;
            }
            $this->db->trans_start();
            $existing_application_data = $this->building_plan_model->get_building_plan_by_id($building_plan_id);
            if (empty($existing_application_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            //document_file
            move_image($dbFileNameField, $existing_application_data, "documents/buildingplan/$building_plan_id", 'garbage');

            $application_data = array();
            $application_data[$dbFileNameField] = '';
            $application_data['updated_by'] = $user_id;
            $application_data['updated_time'] = date('Y-m-d H:i:s');
            $this->building_plan_model->update_building_plan($building_plan_id, $application_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $application_data[$dbFileNameField] = '';
            $success_array = get_success_array();
            $success_array['message'] = 'Attached Document Removed Successfully !';
            $success_array['upload_file_for_building_plan'] = $application_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function approve_for_buildingplan() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $buildingplan_id = get_from_post('buildingplan_id');
            if (!is_post() || $buildingplan_id == NULL || !$buildingplan_id || $user_id == NULL || !$user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }

            $this->db->trans_start();

            $building_plan_data['status'] = VALUE_THREE;
            $building_plan_data['updated_by'] = $user_id;
            $building_plan_data['updated_time'] = date('Y-m-d H:i:s');
            $this->building_plan_model->update_building_plan($buildingplan_id, $building_plan_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = APPROVE_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function generate_form1() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $buildingplan_id = get_from_post('buildingplan_id_for_buildingplan_form1');
            if (!is_post() || $user_id == null || !$user_id || $buildingplan_id == null || !$buildingplan_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_building_plan_data = $this->utility_model->get_by_id('buildingplan_id', $buildingplan_id, 'buildingplan');

            if (empty($existing_building_plan_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('building_plan_data' => $existing_building_plan_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('buildingplan/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_buildingplan_data_by_buildingplan_id() {
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
            $buildingplan_id = get_from_post('buildingplan_id');
            if (!$buildingplan_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $building_plan_data = $this->utility_model->get_by_id_with_applicant_name('buildingplan_id', $buildingplan_id, 'buildingplan');
            if (empty($building_plan_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_THIRTYSIX, 'fees_bifurcation', 'module_id', $buildingplan_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_THIRTYSIX, $buildingplan_id);
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['building_plan_data'] = $building_plan_data;
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
            $buildingplan_id = get_from_post('buildingplan_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$buildingplan_id || $buildingplan_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('buildingplan_id', $buildingplan_id, 'buildingplan');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'buildingplan' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('buildingplan_id', $buildingplan_id, 'buildingplan', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $buildingplan_id = get_from_post('building_plan_id_for_building_plan_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $buildingplan_id == NULL || !$buildingplan_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_building_plan_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $building_plan_data = array();
            if ($_FILES['challan_for_building_plan_upload_challan']['name'] != '') {
                $main_path = 'documents/buildingplan';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'buildingplan';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_building_plan_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_building_plan_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $building_plan_data['challan'] = $filename;
                $building_plan_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $building_plan_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $building_plan_data['status'] = VALUE_NINE;
            }
            $building_plan_data['payment_type'] = $payment_type;
            $building_plan_data['updated_by'] = $user_id;
            $building_plan_data['updated_time'] = date('Y-m-d H:i:s');
            $building_plan_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_THIRTYSIX, $buildingplan_id, $user_id, $building_plan_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_THIRTYSIX, 'fees_bifurcation', $update_data, 'module_id', $buildingplan_id);
            }

            $this->utility_model->update_data('buildingplan_id', $buildingplan_id, 'buildingplan', $building_plan_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $building_plan_data['total_fees'];
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
            $buildingplan_id = get_from_post('buildingplan_id_for_building_plan_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$buildingplan_id || $buildingplan_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = "CIF&B/FACT/DNH/" . date('Y') . "/" . get_from_post('registration_number_for_building_plan_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_building_plan_approve');
            $update_data['remarks'] = get_from_post('remarks_for_building_plan_approve');
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
            $ex_data = $this->utility_model->get_by_id('buildingplan_id', $buildingplan_id, 'buildingplan');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYSIX, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('buildingplan_id', $buildingplan_id, 'buildingplan', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_THIRTYSIX, $buildingplan_id);
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
            $buildingplan_id = get_from_post('buildingplan_id_for_building_plan_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$buildingplan_id || $buildingplan_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_building_plan_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('buildingplan_id', $buildingplan_id, 'buildingplan');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYSIX, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('buildingplan_id', $buildingplan_id, 'buildingplan', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_THIRTYSIX, $buildingplan_id);
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
            $buildingplan_id = get_from_post('buildingplan_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $buildingplan_id == null || !$buildingplan_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_buildingplan_data = $this->utility_model->get_by_id('buildingplan_id', $buildingplan_id, 'buildingplan');
            if (empty($existing_buildingplan_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_buildingplan_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('buildingplan_data' => $existing_buildingplan_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('buildingplan/certificate', $data, TRUE));
            $mpdf->Output('Buildingplan_certificate_' . time() . '.pdf', 'D');
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
            $excel_data = $this->building_plan_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Building_Plan_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Factory Name',
                'Factory Building', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_THIRTYSIX]) ? $prefix_module_array[VALUE_THIRTYSIX] : '';
                    $list['buildingplan_id'] = generate_registration_number($prefix, $list['buildingplan_id']);
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