<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Filmshooting extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('filmshooting_model');
    }

    function get_filmshooting_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['filmshooting_data'] = array();
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
            $success_array['filmshooting_data'] = $this->filmshooting_model->get_all_filmshooting_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->filmshooting_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->filmshooting_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['filmshooting_data'], VALUE_TWENTYTWO);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['filmshooting_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['filmshooting_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_filmshooting_data_by_id() {
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
            $filmshooting_id = get_from_post('filmshooting_id');
            if (!$filmshooting_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $filmshooting_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($filmshooting_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['filmshooting_data'] = $filmshooting_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_filmshooting_renewal_data_by_id() {
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
            $filmshooting_id = get_from_post('filmshooting_id');
            if (!$filmshooting_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $filmshooting_renewal_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting_renewal');
            if (empty($filmshooting_renewal_data)) {
                $filmshooting_renewal_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
                if (empty($filmshooting_renewal_data)) {
                    echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                    return false;
                }
            }
            //$filmshooting_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');   

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['filmshooting_data'] = $filmshooting_renewal_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_filmshooting() {
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
            $filmshooting_id = get_from_post('filmshooting_id');
            $filmshooting_data = $this->_get_post_data_for_filmshooting();
            $validation_message = $this->_check_validation_for_filmshooting($filmshooting_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            // if ($_FILES['declaration_for_filmshooting']['name'] != '') {
            //     $main_path = 'documents/filmshooting';
            //     // if (!is_dir($main_path)) {
            //     //     mkdir($main_path);
            //     //     chmod("$main_path", 0755);
            //     // }
            //     $documents_path = 'documents';
            //     if (!is_dir($documents_path)) {
            //         mkdir($documents_path);
            //         chmod($documents_path, 0777);
            //     }
            //     $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
            //     if (!is_dir($module_path)) {
            //         mkdir($module_path);
            //         chmod($module_path, 0777);
            //     }
            //     $this->load->library('upload');
            //     $temp_filename = str_replace('_', '', $_FILES['declaration_for_filmshooting']['name']);
            //     $filename = 'filmshooting_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //     //Change file name
            //     $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //     if (!move_uploaded_file($_FILES['declaration_for_filmshooting']['tmp_name'], $final_path)) {
            //         echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //         return;
            //     }
            //     $filmshooting_data['declaration'] = $filename;
            // }
            // if ($_FILES['producer_signature_for_filmshooting']['name'] != '') {
            //     $main_path = 'documents/filmshooting';
            //     // if (!is_dir($main_path)) {
            //     //     mkdir($main_path);
            //     //     chmod("$main_path", 0755);
            //     // }
            //     $documents_path = 'documents';
            //     if (!is_dir($documents_path)) {
            //         mkdir($documents_path);
            //         chmod($documents_path, 0777);
            //     }
            //     $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
            //     if (!is_dir($module_path)) {
            //         mkdir($module_path);
            //         chmod($module_path, 0777);
            //     }
            //     $this->load->library('upload');
            //     $temp_filename = str_replace('_', '', $_FILES['producer_signature_for_filmshooting']['name']);
            //     $filename = 'filmshooting_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //     //Change file name
            //     $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //     if (!move_uploaded_file($_FILES['producer_signature_for_filmshooting']['tmp_name'], $final_path)) {
            //         echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //         return;
            //     }
            //     $filmshooting_data['producer_signature'] = $filename;
            // }
            // if ($_FILES['authorized_representative_sign_for_filmshooting']['name'] != '') {
            //     $main_path = 'documents/filmshooting';
            //     // if (!is_dir($main_path)) {
            //     //     mkdir($main_path);
            //     //     chmod("$main_path", 0755);
            //     // }
            //     $documents_path = 'documents';
            //     if (!is_dir($documents_path)) {
            //         mkdir($documents_path);
            //         chmod($documents_path, 0777);
            //     }
            //     $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
            //     if (!is_dir($module_path)) {
            //         mkdir($module_path);
            //         chmod($module_path, 0777);
            //     }
            //     $this->load->library('upload');
            //     $temp_filename = str_replace('_', '', $_FILES['authorized_representative_sign_for_filmshooting']['name']);
            //     $filename = 'filmshooting_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //     //Change file name
            //     $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //     if (!move_uploaded_file($_FILES['authorized_representative_sign_for_filmshooting']['tmp_name'], $final_path)) {
            //         echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //         return;
            //     }
            //     $filmshooting_data['authorized_representative_sign'] = $filename;
            // }
            // if ($_FILES['seal_of_company_for_filmshooting']['name'] != '') {
            //     $main_path = 'documents/filmshooting';
            //     // if (!is_dir($main_path)) {
            //     //     mkdir($main_path);
            //     //     chmod("$main_path", 0755);
            //     // }
            //     $documents_path = 'documents';
            //     if (!is_dir($documents_path)) {
            //         mkdir($documents_path);
            //         chmod($documents_path, 0777);
            //     }
            //     $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
            //     if (!is_dir($module_path)) {
            //         mkdir($module_path);
            //         chmod($module_path, 0777);
            //     }
            //     $this->load->library('upload');
            //     $temp_filename = str_replace('_', '', $_FILES['seal_of_company_for_filmshooting']['name']);
            //     $filename = 'filmshooting_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //     //Change file name
            //     $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //     if (!move_uploaded_file($_FILES['seal_of_company_for_filmshooting']['tmp_name'], $final_path)) {
            //         echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //         return;
            //     }
            //     $filmshooting_data['seal_of_company'] = $filename;
            // }
            // if ($_FILES['witness_one_sign_for_filmshooting']['name'] != '') {
            //     $main_path = 'documents/filmshooting';
            //     // if (!is_dir($main_path)) {
            //     //     mkdir($main_path);
            //     //     chmod("$main_path", 0755);
            //     // }
            //     $documents_path = 'documents';
            //     if (!is_dir($documents_path)) {
            //         mkdir($documents_path);
            //         chmod($documents_path, 0777);
            //     }
            //     $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
            //     if (!is_dir($module_path)) {
            //         mkdir($module_path);
            //         chmod($module_path, 0777);
            //     }
            //     $this->load->library('upload');
            //     $temp_filename = str_replace('_', '', $_FILES['witness_one_sign_for_filmshooting']['name']);
            //     $filename = 'filmshooting_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //     //Change file name
            //     $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //     if (!move_uploaded_file($_FILES['witness_one_sign_for_filmshooting']['tmp_name'], $final_path)) {
            //         echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //         return;
            //     }
            //     $filmshooting_data['witness_one_sign'] = $filename;
            // }
            // if ($_FILES['witness_two_sign_for_filmshooting']['name'] != '') {
            //     $main_path = 'documents/filmshooting';
            //     // if (!is_dir($main_path)) {
            //     //     mkdir($main_path);
            //     //     chmod("$main_path", 0755);
            //     // }
            //     $documents_path = 'documents';
            //     if (!is_dir($documents_path)) {
            //         mkdir($documents_path);
            //         chmod($documents_path, 0777);
            //     }
            //     $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
            //     if (!is_dir($module_path)) {
            //         mkdir($module_path);
            //         chmod($module_path, 0777);
            //     }
            //     $this->load->library('upload');
            //     $temp_filename = str_replace('_', '', $_FILES['witness_two_sign_for_filmshooting']['name']);
            //     $filename = 'filmshooting_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //     //Change file name
            //     $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //     if (!move_uploaded_file($_FILES['witness_two_sign_for_filmshooting']['tmp_name'], $final_path)) {
            //         echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //         return;
            //     }
            //     $filmshooting_data['witness_two_sign'] = $filename;
            // }


            $this->db->trans_start();
            $filmshooting_data['shooting_date_time'] = convert_to_mysql_date_format($filmshooting_data['shooting_date_time']);
            // $filmshooting_data['user_id'] = $user_id;
            // $filmshooting_data['status'] = $module_type;
            if (!$filmshooting_id || $filmshooting_id == NULL) {
                $filmshooting_data['created_by'] = $user_id;
                $filmshooting_data['created_time'] = date('Y-m-d H:i:s');
                $filmshooting_id = $this->utility_model->insert_data('filmshooting', $filmshooting_data);
            } else {
                $filmshooting_data['updated_by'] = $user_id;
                $filmshooting_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('filmshooting_id', $filmshooting_id, 'filmshooting', $filmshooting_data);
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

    function _get_post_data_for_filmshooting() {
        $filmshooting_data = array();
        $filmshooting_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $filmshooting_data['production_house'] = get_from_post('production_house');
        $filmshooting_data['address'] = get_from_post('address');
        $filmshooting_data['production_manager'] = get_from_post('production_manager');
        $filmshooting_data['contact_no'] = get_from_post('contact_no');
        $filmshooting_data['email'] = get_from_post('email');
        $filmshooting_data['director_cast'] = get_from_post('director_cast');
        $filmshooting_data['film_title'] = get_from_post('film_title');
        $filmshooting_data['film_synopsis'] = get_from_post('film_synopsis');
        $filmshooting_data['film_shooting_days'] = get_from_post('film_shooting_days');
        $filmshooting_data['shooting_location'] = get_from_post('shooting_location');
        $filmshooting_data['shooting_date_time'] = get_from_post('shooting_date_time');
        $filmshooting_data['defense_installation'] = get_from_post('defense_installation');
        $filmshooting_data['district'] = get_from_post('district');
        $filmshooting_data['undersigned'] = get_from_post('undersigned');
        $filmshooting_data['aged'] = get_from_post('aged');
        $filmshooting_data['resident'] = get_from_post('resident');
        $filmshooting_data['purpose'] = get_from_post('purpose');
        $filmshooting_data['witness_one_name'] = get_from_post('witness_one_name');
        $filmshooting_data['witness_two_name'] = get_from_post('witness_two_name');
        return $filmshooting_data;
    }

    function _check_validation_for_filmshooting($filmshooting_data) {
        if (!$filmshooting_data['district']) {
            return OWNER_DISTRICT_MESSAGE;
        }
        if (!$filmshooting_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$filmshooting_data['production_house']) {
            return PRODUCTION_HOUSE_MESSAGE;
        }
        if (!$filmshooting_data['address']) {
            return WORKSHOPS_ADDRESS_MESSAGE;
        }
        if (!$filmshooting_data['production_manager']) {
            return PRODUCTION_MANAGER_MESSAGE;
        }
        if (!$filmshooting_data['contact_no']) {
            return CONTACT_NO_MESSAGE;
        }
        if (!$filmshooting_data['email']) {
            return EMAIL_MESSAGE;
        }
        if (!$filmshooting_data['director_cast']) {
            return DIRECTOR_MESSAGE;
        }
        if (!$filmshooting_data['film_title']) {
            return FILM_TITLE_MESSAGE;
        }
        if (!$filmshooting_data['film_synopsis']) {
            return FILM_SYNOPSIS_MESSAGE;
        }
        if (!$filmshooting_data['film_shooting_days']) {
            return FILM_SHOOTING_DAYS_MESSAGE;
        }
        if (!$filmshooting_data['shooting_location']) {
            return SHOOTING_LOCATION_MESSAGE;
        }
        if (!$filmshooting_data['shooting_date_time']) {
            return SHOOTING_DATE_MESSAGE;
        }
        if (!$filmshooting_data['defense_installation']) {
            return DEFENSE_INSTALLATION_MESSAGE;
        }
        if (!$filmshooting_data['undersigned']) {
            return UNDERSIGNED_MESSAGE;
        }
        if (!$filmshooting_data['aged']) {
            return AGED_YEAR_MESSAGE;
        }
        if (!$filmshooting_data['resident']) {
            return RESIDENT_MESSAGE;
        }
        if (!$filmshooting_data['purpose']) {
            return DECPURPOSE_MESSAGE;
        }
        if (!$filmshooting_data['witness_one_name']) {
            return WITNESS_NAME_MESSAGE;
        }
        if (!$filmshooting_data['witness_two_name']) {
            return WITNESS_NAME_MESSAGE;
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
            $filmshooting_id = get_from_post('filmshooting_id');
            $document_id = get_from_post('document_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$filmshooting_id || $filmshooting_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_filmshooting_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($ex_filmshooting_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'filmshooting' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_filmshooting_data[$document_id];

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('filmshooting_id', $filmshooting_id, 'filmshooting', array($document_id => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));

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
            $filmshooting_id = get_from_post('filmshooting_id_for_filmshooting_form1');
            if (!is_post() || $user_id == null || !$user_id || $filmshooting_id == null || !$filmshooting_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_filmshooting_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');

            if (empty($existing_filmshooting_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('filmshooting_data' => $existing_filmshooting_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('filmshooting/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_filmshooting_data_by_filmshooting_id() {
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
            $filmshooting_id = get_from_post('filmshooting_id');
            if (!$filmshooting_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $filmshooting_data = $this->utility_model->get_by_id_with_applicant_name('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($filmshooting_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWENTYTWO, 'fees_bifurcation', 'module_id', $filmshooting_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_TWENTYTWO, $filmshooting_id);
                }
                if ($filmshooting_data['status'] != VALUE_FOUR && $filmshooting_data['status'] != VALUE_FIVE &&
                        $filmshooting_data['status'] != VALUE_SIX && $filmshooting_data['status'] != VALUE_SEVEN &&
                        $filmshooting_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        $filmshooting_data['show_remove_upload_btn'] = true;
                        $filmshooting_data['show_dropdown'] = true;
                        $filmshooting_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWENTYTWO, 'dept_fd');
                    }
                }
            }
            $success_array = get_success_array();
            $success_array['filmshooting_data'] = $filmshooting_data;
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
            $filmshooting_id = get_from_post('filmshooting_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$filmshooting_id || $filmshooting_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'filmshooting' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('filmshooting_id', $filmshooting_id, 'filmshooting', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $filmshooting_id = get_from_post('filmshooting_id_for_filmshooting_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $filmshooting_id == NULL || !$filmshooting_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_filmshooting_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $filmshooting_data = array();
            if ($_FILES['challan_for_filmshooting_upload_challan']['name'] != '') {
                $main_path = 'documents/filmshooting';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'filmshooting';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_filmshooting_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_filmshooting_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $filmshooting_data['challan'] = $filename;
                $filmshooting_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $filmshooting_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $filmshooting_data['status'] = VALUE_NINE;
            }
            $filmshooting_data['payment_type'] = $payment_type;
            $filmshooting_data['updated_by'] = $user_id;
            $filmshooting_data['updated_time'] = date('Y-m-d H:i:s');
            $filmshooting_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_TWENTYTWO, $filmshooting_id, $user_id, $filmshooting_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_TWENTYTWO, 'fees_bifurcation', $update_data, 'module_id', $filmshooting_id);
            }

            $this->utility_model->update_data('filmshooting_id', $filmshooting_id, 'filmshooting', $filmshooting_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $filmshooting_data['total_fees'];
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
            $filmshooting_id = get_from_post('filmshooting_id_for_filmshooting_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$filmshooting_id || $filmshooting_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_filmshooting_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_filmshooting_approve');
            $update_data['remarks'] = get_from_post('remarks_for_filmshooting_approve');
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
            $ex_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWENTYTWO, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('filmshooting_id', $filmshooting_id, 'filmshooting', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_TWENTYTWO, $filmshooting_id);

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
            $filmshooting_id = get_from_post('filmshooting_id_for_filmshooting_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$filmshooting_id || $filmshooting_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_filmshooting_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWENTYTWO, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('filmshooting_id', $filmshooting_id, 'filmshooting', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_TWENTYTWO, $filmshooting_id);

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
            $filmshooting_id = get_from_post('filmshooting_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $filmshooting_id == null || !$filmshooting_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_filmshooting_data = $this->utility_model->get_by_id('filmshooting_id', $filmshooting_id, 'filmshooting');
            if (empty($existing_filmshooting_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_filmshooting_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('filmshooting_data' => $existing_filmshooting_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('filmshooting/certificate', $data, TRUE));
            $mpdf->Output('FilmShooting_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->filmshooting_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Filmshooting_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Production House',
                'Address.', 'Contact No', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_TWENTYTWO]) ? $prefix_module_array[VALUE_TWENTYTWO] : '';
                    $list['filmshooting_id'] = generate_registration_number($prefix, $list['filmshooting_id']);
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