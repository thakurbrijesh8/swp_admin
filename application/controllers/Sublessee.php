<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Sublessee extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('sublessee_model');
    }

    function get_sublessee_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['sublessee_data'] = array();
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
            $search_plot_no = trim($columns[5]['search']['value']);
            $search_nom = trim($columns[6]['search']['value']);
            $search_app_timing = trim($columns[7]['search']['value']);
            $search_status = trim($columns[8]['search']['value']);
            $search_query_status = trim($columns[9]['search']['value']);

            $new_s_app_timing_status = get_from_post('search_app_timing_status');
            $search_app_timing = $new_s_app_timing_status != '' ? $new_s_app_timing_status : $search_app_timing;
            $new_s_status = get_from_post('search_status');
            $search_status = $new_s_status != '' ? $new_s_status : $search_status;

            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['sublessee_data'] = $this->sublessee_model->get_all_sublessee_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_plot_no, $search_nom, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->sublessee_model->get_total_count_of_records($search_district);
            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_plot_no != '' || $search_nom != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->sublessee_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_plot_no, $search_nom, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['sublessee_data'], VALUE_SEVENTEEN);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['sublessee_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['sublessee_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_sublessee_data_by_id() {
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
            $sublessee_id = get_from_post('sublessee_id');
            if (!$sublessee_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $sublessee_data = $this->sublessee_model->get_sublessee_by_id($sublessee_id);
            if (empty($sublessee_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['sublessee_data'] = $sublessee_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_sublessee() {
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
            $sublessee_id = get_from_post('sublessee_id');
            $sublessee_data = $this->_get_post_data_for_sublessee();
            $validation_message = $this->_check_validation_for_sublessee($sublessee_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            if ($sublessee_data['request_letter'] == IS_CHECKED_YES) {
                if ($_FILES['request_letter_manufacture_for_sublessee']['name'] != '') {
                    $main_path = 'documents/sublessee';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'sublessee';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['request_letter_manufacture_for_sublessee']['name']);
                    $filename = 'request_letter_manufacture_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['request_letter_manufacture_for_sublessee']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $sublessee_data['request_letter_manufacture'] = $filename;
                }
            }
            if ($sublessee_data['detail_project'] == IS_CHECKED_YES) {
                if ($_FILES['detail_project_report_for_sublessee']['name'] != '') {
                    $main_path = 'documents/sublessee';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'sublessee';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['detail_project_report_for_sublessee']['name']);
                    $filename = 'detail_project_report_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['detail_project_report_for_sublessee']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $sublessee_data['detail_project_report'] = $filename;
                }
            }
            if ($sublessee_data['partnership_deed'] == IS_CHECKED_YES) {
                if ($_FILES['memorandum_partnership_deed_for_sublessee']['name'] != '') {
                    $main_path = 'documents/sublessee';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'sublessee';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['memorandum_partnership_deed_for_sublessee']['name']);
                    $filename = 'memorandum_partnership_deed_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['memorandum_partnership_deed_for_sublessee']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $sublessee_data['memorandum_partnership_deed'] = $filename;
                }
            }
            if ($sublessee_data['sign_sublessee'] == IS_CHECKED_YES) {
                if ($_FILES['behalf_sign_sublessee_for_sublessee']['name'] != '') {
                    $main_path = 'documents/sublessee';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'sublessee';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['behalf_sign_sublessee_for_sublessee']['name']);
                    $filename = 'behalf_sign_sublessee_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['behalf_sign_sublessee_for_sublessee']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $sublessee_data['behalf_sign_sublessee'] = $filename;
                }
            }
            if ($_FILES['seal_and_stamp_for_sublessee']['name'] != '') {
                $main_path = 'documents/sublessee';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'sublessee';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_sublessee']['name']);
                $filename = 'sublessee_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['seal_and_stamp_for_sublessee']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $sublessee_data['signature'] = $filename;
            }

            $this->db->trans_start();
            $sublessee_data['date'] = convert_to_mysql_date_format($sublessee_data['date']);
            if (!$sublessee_id || $sublessee_id == NULL) {
                $sublessee_data['created_by'] = $user_id;
                $sublessee_data['created_time'] = date('Y-m-d H:i:s');
                $sublessee_id = $this->utility_model->insert_data('sub_lessee', $sublessee_data);
            } else {
                $sublessee_data['updated_by'] = $user_id;
                $sublessee_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', $sublessee_data);
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

    function _get_post_data_for_sublessee() {
        $sublessee_data = array();
        $sublessee_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $sublessee_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $sublessee_data['state'] = get_from_post('state');
        $sublessee_data['district'] = get_from_post('district');
        $sublessee_data['taluka'] = get_from_post('taluka');
        $sublessee_data['village'] = get_from_post('villages_for_noc_data');
        $sublessee_data['date'] = get_from_post('date');
        $sublessee_data['plot_no'] = get_from_post('plot_no_for_sublessee_data');
        $sublessee_data['survey_no'] = get_from_post('survey_no');
        $sublessee_data['admeasuring'] = get_from_post('admeasuring');
        $sublessee_data['govt_industrial_estate_area'] = get_from_post('govt_industrial_estate_area');
        $sublessee_data['name_of_manufacturing'] = get_from_post('name_of_manufacturing');
        $sublessee_data['request_letter'] = get_from_post('request_letter');
        $sublessee_data['detail_project'] = get_from_post('detail_project');
        $sublessee_data['partnership_deed'] = get_from_post('partnership_deed');
        $sublessee_data['sign_sublessee'] = get_from_post('sign_sublessee');
        return $sublessee_data;
    }

    function _check_validation_for_sublessee($sublessee_data) {
        if (!$sublessee_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$sublessee_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$sublessee_data['state']) {
            return STATE_MESSAGE;
        }
        if (!$sublessee_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$sublessee_data['taluka']) {
            return TALUKA_MESSAGE;
        }
        if (!$sublessee_data['village']) {
            return VILLAGE_NAME_MESSAGE;
        }
//        if (!$sublessee_data['date']) {
//            return DATE_MESSAGE;
//        }
        if (!$sublessee_data['plot_no']) {
            return PLOT_NO_MESSAGE;
        }
        if (!$sublessee_data['survey_no']) {
            return SURVEY_NO_MESSAGE;
        }
        if (!$sublessee_data['admeasuring']) {
            return ADMEASURING_MESSAGE;
        }
        if (!$sublessee_data['govt_industrial_estate_area']) {
            return GOVT_INDUSTRIAL_AR_MESSAGE;
        }
        if (!$sublessee_data['name_of_manufacturing']) {
            return NAME_OF_MANUFACTRING_MESSAGE;
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
            $sublessee_id = get_from_post('sublessee_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$sublessee_id || $sublessee_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('sublessee_id', $sublessee_id, 'sub_lessee');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if ($document_type == VALUE_ONE) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'sublessee' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['request_letter_manufacture'];
            }
            if ($document_type == VALUE_TWO) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'sublessee' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['detail_project_report'];
            }
            if ($document_type == VALUE_THREE) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'sublessee' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['memorandum_partnership_deed'];
            }
            if ($document_type == VALUE_FOUR) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'sublessee' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['behalf_sign_sublessee'];
            }
            if ($document_type == VALUE_FIVE) {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'sublessee' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];
            }

            if (file_exists($file_path)) {
                unlink($file_path);
            }

            if ($document_type == VALUE_ONE) {
                $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', array('request_letter_manufacture' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            }
            if ($document_type == VALUE_TWO) {
                $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', array('detail_project_report' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            }
            if ($document_type == VALUE_THREE) {
                $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', array('memorandum_partnership_deed' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            }
            if ($document_type == VALUE_FOUR) {
                $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', array('behalf_sign_sublessee' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            }
            if ($document_type == VALUE_FIVE) {
                $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $sublessee_id = get_from_post('sublessee_id_for_sublessee_form1');
            if (!is_post() || $user_id == null || !$user_id || $sublessee_id == null || !$sublessee_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_sublessee_data = $this->utility_model->get_by_id('sublessee_id', $sublessee_id, 'sub_lessee');

            if (empty($existing_sublessee_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('sublessee_data' => $existing_sublessee_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('sublessee/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_sublessee_data_by_sublessee_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $sublessee_id = get_from_post('sublessee_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || $sublessee_id == null || !$sublessee_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $sublessee_data = $this->utility_model->get_by_id_with_applicant_name('sublessee_id', $sublessee_id, 'sub_lessee');
            if (empty($sublessee_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_SEVENTEEN, 'fees_bifurcation', 'module_id', $sublessee_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_SEVENTEEN, $sublessee_id);
                }
                if ($sublessee_data['status'] != VALUE_FOUR && $sublessee_data['status'] != VALUE_FIVE &&
                        $sublessee_data['status'] != VALUE_SIX && $sublessee_data['status'] != VALUE_SEVEN &&
                        $sublessee_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($sublessee_data['status'] != VALUE_ELEVEN) {
                            $sublessee_data['show_remove_upload_btn'] = true;
                        }
                        $sublessee_data['show_dropdown'] = true;
                        $sublessee_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_SEVENTEEN, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['sublessee_data'] = $sublessee_data;
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
            $sublessee_id = get_from_post('sublessee_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$sublessee_id || $sublessee_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('sublessee_id', $sublessee_id, 'sub_lessee');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'sublessee' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $sublessee_id = get_from_post('sublessee_id_for_sublessee_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $sublessee_id == NULL || !$sublessee_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_sublessee_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $sublessee_data = array();
            if ($_FILES['challan_for_sublessee_upload_challan']['name'] != '') {
                $main_path = 'documents/sublessee';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'sublessee';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_sublessee_upload_challan']['name']);
                $filename = 'challan_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_sublessee_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $sublessee_data['challan'] = $filename;
                $sublessee_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $sublessee_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $sublessee_data['status'] = VALUE_NINE;
            }
            $sublessee_data['payment_type'] = $payment_type;
            $sublessee_data['updated_by'] = $user_id;
            $sublessee_data['updated_time'] = date('Y-m-d H:i:s');
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_SEVENTEEN, $sublessee_id, $user_id, $sublessee_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_SEVENTEEN, 'fees_bifurcation', $update_data, 'module_id', $sublessee_id);
            }

            $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', $sublessee_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
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
            $sublessee_id = get_from_post('sublessee_id_for_sublessee_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$sublessee_id || $sublessee_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['valid_upto'] = get_from_post('valid_upto_for_sublessee_approve');
            $update_data['remarks'] = get_from_post('remarks_for_sublessee_approve');
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
            $ex_data = $this->utility_model->get_by_id('sublessee_id', $sublessee_id, 'sub_lessee');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_SEVENTEEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_SEVENTEEN, $sublessee_id);

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
            $sublessee_id = get_from_post('sublessee_id_for_sublessee_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$sublessee_id || $sublessee_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_sublessee_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('sublessee_id', $sublessee_id, 'sub_lessee');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_SEVENTEEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('sublessee_id', $sublessee_id, 'sub_lessee', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_SEVENTEEN, $sublessee_id);

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
            $sublessee_id = get_from_post('sublessee_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $sublessee_id == null || !$sublessee_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_sublessee_data = $this->utility_model->get_by_id('sublessee_id', $sublessee_id, 'sub_lessee');
            if (empty($existing_sublessee_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_sublessee_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('sublessee_data' => $existing_sublessee_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('sublessee/certificate', $data, TRUE));
            $mpdf->Output('sublessee_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->sublessee_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Sublessee_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Name of Applicant', 'Plot No',
                'Name of Manufacturing', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_SEVENTEEN]) ? $prefix_module_array[VALUE_SEVENTEEN] : '';
                    $list['sublessee_id'] = generate_registration_number($prefix, $list['sublessee_id']);
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
 * EOF: ./application/controller/Sublessee.php
 */