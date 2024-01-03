<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Landallotment extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('landallotment_model');
    }

    function get_landallotment_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['landallotment_data'] = array();
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
            $success_array['landallotment_data'] = $this->landallotment_model->get_all_landallotment_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->landallotment_model->get_total_count_of_records($search_district);
            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->landallotment_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['landallotment_data'], VALUE_TWENTYFIVE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['landallotment_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['landallotment_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_landallotment_data_by_id() {
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
            $landallotment_id = get_from_post('landallotment_id');
            if (!$landallotment_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $landallotment_data = $this->landallotment_model->get_landallotment_by_id($landallotment_id);
            if (empty($landallotment_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['landallotment_data'] = $landallotment_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_landallotment() {
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
            $landallotment_id = get_from_post('landallotment_id');
            $landallotment_data = $this->_get_post_data_for_landallotment();
            $validation_message = $this->_check_validation_for_landallotment($landallotment_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            if ($_FILES['bio_data_doc']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['bio_data_doc']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['bio_data_doc']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['bio_data_doc'] = $filename;
            }

            //if ($landallotment_data['constitution_artical'] == IS_CHECKED_YES ) {
            if ($landallotment_data['constitution_artical'] == 'proprietary' || $landallotment_data['constitution_artical'] == 'partnership' || $landallotment_data['constitution_artical'] == 'private' || $landallotment_data['constitution_artical'] == 'public' || $landallotment_data['constitution_artical'] == 'limited_liability_partnership' || $landallotment_data['constitution_artical'] == 'others') {

                if ($_FILES['constitution_artical_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['constitution_artical_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['constitution_artical_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['constitution_artical_doc'] = $filename;
                }
            }

            if ($landallotment_data['obtained_letter_of_intent'] == IS_CHECKED_YES) {
                if ($_FILES['obtained_letter_of_intent_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['obtained_letter_of_intent_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['obtained_letter_of_intent_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['obtained_letter_of_intent_doc'] = $filename;
                }
            }
            if ($landallotment_data['regist_letter_msme'] == IS_CHECKED_YES) {
                if ($_FILES['regist_letter_msme_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['regist_letter_msme_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['regist_letter_msme_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['regist_letter_msme_doc'] = $filename;
                }
            }
            if ($_FILES['detailed_project_report_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['detailed_project_report_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['detailed_project_report_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['detailed_project_report_doc'] = $filename;
            }

            if ($_FILES['proposed_finance_terms_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['proposed_finance_terms_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['proposed_finance_terms_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['proposed_finance_terms_doc'] = $filename;
            }

            if ($_FILES['details_of_manufacturing_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['details_of_manufacturing_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['details_of_manufacturing_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['details_of_manufacturing_doc'] = $filename;
            }
            if ($landallotment_data['if_backward_class_bac'] == IS_CHECKED_YES) {
                if ($_FILES['if_backward_class_bac_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['if_backward_class_bac_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['if_backward_class_bac_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['if_backward_class_bac_doc'] = $filename;
                }
            }
            if ($landallotment_data['if_backward_class_scst'] == IS_CHECKED_YES) {
                if ($_FILES['if_backward_class_scst_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['if_backward_class_scst_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['if_backward_class_scst_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['if_backward_class_scst_doc'] = $filename;
                }
            }
            if ($landallotment_data['if_backward_class_ex_serv'] == IS_CHECKED_YES) {
                if ($_FILES['if_backward_class_ex_serv_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['if_backward_class_ex_serv_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['if_backward_class_ex_serv_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['if_backward_class_ex_serv_doc'] = $filename;
                }
            }

            if ($landallotment_data['if_backward_class_wm'] == IS_CHECKED_YES) {
                if ($_FILES['if_backward_class_wm_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['if_backward_class_wm_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['if_backward_class_wm_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['if_backward_class_wm_doc'] = $filename;
                }
            }
            if ($landallotment_data['if_backward_class_ph'] == IS_CHECKED_YES) {
                if ($_FILES['if_backward_class_ph_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['if_backward_class_ph_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['if_backward_class_ph_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['if_backward_class_ph_doc'] = $filename;
                }
            }
            if ($landallotment_data['if_belonging_transg'] == IS_CHECKED_YES) {
                if ($_FILES['if_belonging_transg_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['if_belonging_transg_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['if_belonging_transg_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['if_belonging_transg_doc'] = $filename;
                }
            }

            if ($landallotment_data['if_bonafide'] == IS_CHECKED_YES) {
                if ($_FILES['bonafide_of_dnh_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['bonafide_of_dnh_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['bonafide_of_dnh_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['bonafide_of_dnh_doc'] = $filename;
                }
            }

            if ($_FILES['information_raw_materials_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['information_raw_materials_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['information_raw_materials_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['information_raw_materials_doc  '] = $filename;
            }
            if ($_FILES['infrastructure_requirement_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['infrastructure_requirement_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['infrastructure_requirement_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['infrastructure_requirement_doc  '] = $filename;
            }
            if ($_FILES['effluent_teratment_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['effluent_teratment_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['effluent_teratment_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['effluent_teratment_doc  '] = $filename;
            }

            if ($_FILES['emission_of_gases_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['emission_of_gases_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['emission_of_gases_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['emission_of_gases_doc'] = $filename;
            }

            if ($_FILES['copy_authority_letter_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['copy_authority_letter_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['copy_authority_letter_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['copy_authority_letter_doc'] = $filename;
            }
            //----------------------------------------------------
            if ($_FILES['copy_project_profile_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['copy_project_profile_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['copy_project_profile_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['copy_project_profile_doc'] = $filename;
            }
            //----------------------------------------------------
            if ($_FILES['demand_of_deposit_draft_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['demand_of_deposit_draft_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['demand_of_deposit_draft_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['demand_of_deposit_draft'] = $filename;
            }
            //----------------------------------------------------------------------------
            if ($_FILES['copy_proposed_land_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['copy_proposed_land_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['copy_proposed_land_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['copy_proposed_land_doc'] = $filename;
            }

            //----------------------------------------------------------------------------
            if ($_FILES['copy_of_partnership_deed_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['copy_of_partnership_deed_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['copy_of_partnership_deed_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['copy_of_partnership_deed_doc'] = $filename;
            }
            //----------------------------------------------------------------------------
            if ($_FILES['relevant_experience_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['relevant_experience_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['relevant_experience_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['relevant_experience_doc'] = $filename;
            }
            //----------------------------------------------------------------------------
            if ($landallotment_data['if_promotion_council'] == IS_CHECKED_YES) {
                if ($_FILES['certy_by_direc_indus_doc_for_landallotment']['name'] != '') {
                    $main_path = 'documents/landallotment';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['certy_by_direc_indus_doc_for_landallotment']['name']);
                    $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['certy_by_direc_indus_doc_for_landallotment']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $landallotment_data['certy_by_direc_indus_doc'] = $filename;
                }
            }
            //----------------------------------------------------------------------------
            if ($_FILES['other_relevant_doc_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['other_relevant_doc_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['other_relevant_doc_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['other_relevant_doc'] = $filename;
            }


            if ($_FILES['seal_and_stamp_for_landallotment']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_landallotment']['name']);
                $filename = 'landallotment_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['seal_and_stamp_for_landallotment']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['signature'] = $filename;
            }
            $proprietorData = $this->input->post('proprietor_data');
            $proprietor_decode_Data = json_decode($proprietorData, true);
            if ($proprietorData == "" || empty($proprietor_decode_Data)) {
                echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
                return false;
            }


            $this->db->trans_start();

            $landallotment_data['application_date'] = convert_to_mysql_date_format($landallotment_data['application_date']);

            $landallotment_data['proprietor_details'] = $proprietorData;
            // $landallotment_data['user_id'] = $user_id;
            // $landallotment_data['status'] = $module_type;
            if (!$landallotment_id || $landallotment_id == NULL) {
                $landallotment_data['created_by'] = $user_id;
                $landallotment_data['created_time'] = date('Y-m-d H:i:s');
                $landallotment_data['declaration'] = VALUE_ONE;
                $landallotment_id = $this->utility_model->insert_data('land_allotment', $landallotment_data);
            } else {
                // $landallotment_data['application_date'] = date('Y-m-d');
                $landallotment_data['updated_by'] = $user_id;
                $landallotment_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('landallotment_id', $landallotment_id, 'land_allotment', $landallotment_data);
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

    function _get_post_data_for_landallotment() {
        $landallotment_data = array();
        $landallotment_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $landallotment_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $landallotment_data['applicant_address'] = get_from_post('applicant_address');
        $landallotment_data['application_date'] = get_from_post('application_date');
        $landallotment_data['email'] = get_from_post('email');
        $landallotment_data['telehpone_no'] = get_from_post('telehpone_no');
        $landallotment_data['village'] = get_from_post('villages_for_noc_data');
        $landallotment_data['plot_no'] = get_from_post('plot_no_for_landallotment_data');
        $landallotment_data['govt_industrial_estate_area'] = get_from_post('govt_industrial_estate_area');
        $landallotment_data['expansion_industry'] = get_from_post('expansion_industry');
        $landallotment_data['nature_of_industry'] = get_from_post('nature_of_industry');
        $landallotment_data['constitution_artical'] = get_from_post('constitution_artical');
        $landallotment_data['possession_of_industry_plot'] = get_from_post('possession_of_industry_plot');
        $landallotment_data['industrial_license_necessary'] = get_from_post('industrial_license_necessary');
        $landallotment_data['obtained_letter_of_intent'] = get_from_post('obtained_letter_of_intent');
        $landallotment_data['regist_letter_msme'] = get_from_post('regist_letter_msme');
        $landallotment_data['if_project_collaboration'] = get_from_post('if_project_collaboration');
        $landallotment_data['project_collaboration'] = get_from_post('project_collaboration');
        $landallotment_data['if_project_requires_import'] = get_from_post('if_project_requires_import');
        $landallotment_data['project_requires_import'] = get_from_post('project_requires_import');
        $landallotment_data['no_of_persons_likely_emp'] = get_from_post('no_of_persons_likely_emp');
        $landallotment_data['no_of_persons_likely_emp_no'] = get_from_post('no_of_persons_likely_emp_no');
        $landallotment_data['no_of_persons_likely_emp_unskilled'] = get_from_post('no_of_persons_likely_emp_unskilled');
        $landallotment_data['no_of_persons_likely_emp_no_unskilled'] = get_from_post('no_of_persons_likely_emp_no_unskilled');
        $landallotment_data['no_of_persons_likely_emp_staff'] = get_from_post('no_of_persons_likely_emp_staff');
        $landallotment_data['no_of_persons_likely_emp_no_staff'] = get_from_post('no_of_persons_likely_emp_no_staff');
        $landallotment_data['if_backward_class_bac'] = get_from_post('if_backward_class_bac');
        $landallotment_data['if_backward_class_scst'] = get_from_post('if_backward_class_scst');
        $landallotment_data['if_backward_class_ex_serv'] = get_from_post('if_backward_class_ex_serv');
        $landallotment_data['if_backward_class_wm'] = get_from_post('if_backward_class_wm');
        $landallotment_data['if_backward_class_ph'] = get_from_post('if_backward_class_ph');
        $landallotment_data['if_belonging_transg'] = get_from_post('if_belonging_transg');
        $landallotment_data['if_belonging_other'] = get_from_post('if_belonging_other');
        $landallotment_data['if_bonafide'] = get_from_post('if_bonafide');
        $landallotment_data['ifnot_state_particular_place'] = get_from_post('ifnot_state_particular_place');
        $landallotment_data['state_particular_place'] = get_from_post('state_particular_place');
        $landallotment_data['detail_of_space'] = get_from_post('detail_of_space');
        $landallotment_data['treatment_indicate'] = get_from_post('treatment_indicate');
        $landallotment_data['detail_of_emission_of_gases'] = get_from_post('detail_of_emission_of_gases');
        $landallotment_data['if_promotion_council'] = get_from_post('if_promotion_council');
        return $landallotment_data;
    }

    function _check_validation_for_landallotment($landallotment_data) {
        if (!$landallotment_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$landallotment_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$landallotment_data['applicant_address']) {
            return APPLICANT_ADDRESS_MESSAGE;
        }
        if (!$landallotment_data['email']) {
            return EMAIL_MESSAGE;
        }
        if (!$landallotment_data['telehpone_no']) {
            return TELEPHONE_NO_MESSAGE;
        }
        if (!$landallotment_data['village']) {
            return VILLAGE_NAME_MESSAGE;
        }
        if (!$landallotment_data['plot_no']) {
            return PLOT_NO_MESSAGE;
        }
        if (!$landallotment_data['constitution_artical']) {
            return REASON_OF_LOAN_MESSAGE;
        }
        if (!$landallotment_data['expansion_industry']) {
            return EXPANSION_INDUSTRY_MESSAGE;
        }
        if (!$landallotment_data['nature_of_industry']) {
            return NATURE_OF_INDUSTRAY_MESSAGE;
        }
        if (!$landallotment_data['possession_of_industry_plot']) {
            return POSSESSTION_OF_INDUSTRY_MESSAGE;
        }
        if (!$landallotment_data['detail_of_space']) {
            return Detail_MESSAGE;
        }
        if (!$landallotment_data['treatment_indicate']) {
            return Detail_MESSAGE;
        }
        if (!$landallotment_data['detail_of_emission_of_gases']) {
            return Detail_MESSAGE;
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
            $landallotment_id = get_from_post('landallotment_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$landallotment_id || $landallotment_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('landallotment_id', $landallotment_id, 'land_allotment');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'landallotment' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];


            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('landallotment_id', $landallotment_id, 'land_allotment', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));


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
            $landallotment_id = get_from_post('landallotment_id_for_landallotment_form1');
            if (!is_post() || $user_id == null || !$user_id || $landallotment_id == null || !$landallotment_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_landallotment_data = $this->utility_model->get_by_id('landallotment_id', $landallotment_id, 'land_allotment');

            if (empty($existing_landallotment_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $village_data = $this->utility_model->get_by_id('village_id', $existing_landallotment_data['village'], 'villages');
            $existing_landallotment_data['village_name'] = $village_data['village_name'];

            $plot_data = $this->utility_model->get_by_id('plot_id', $existing_landallotment_data['plot_no'], 'plot_numbers');
            $existing_landallotment_data['plot_no'] = $plot_data['plot_no'];
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('landallotment_data' => $existing_landallotment_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('landallotment/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_landallotment_data_by_landallotment_id() {
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
            $landallotment_id = get_from_post('landallotment_id');
            if (!$landallotment_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $landallotment_data = $this->utility_model->get_by_id_with_applicant_name('landallotment_id', $landallotment_id, 'land_allotment');
            if (empty($landallotment_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWENTYFIVE, 'fees_bifurcation', 'module_id', $landallotment_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_TWENTYFIVE, $landallotment_id);
                }
            }
            $success_array = get_success_array();
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array['landallotment_data'] = $landallotment_data;
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
            $landallotment_id = get_from_post('landallotment_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$landallotment_id || $landallotment_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('landallotment_id', $landallotment_id, 'land_allotment');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'landallotment' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('landallotment_id', $landallotment_id, 'land_allotment', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $landallotment_id = get_from_post('landallotment_id_for_landallotment_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $landallotment_id == NULL || !$landallotment_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_landallotment_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $landallotment_data = array();
            if ($_FILES['challan_for_landallotment_upload_challan']['name'] != '') {
                $main_path = 'documents/landallotment';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'landallotment';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_landallotment_upload_challan']['name']);
                $filename = 'challan_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_landallotment_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $landallotment_data['challan'] = $filename;
                $landallotment_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $landallotment_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $landallotment_data['status'] = VALUE_NINE;
            }
            $landallotment_data['payment_type'] = $payment_type;
            $landallotment_data['updated_by'] = $user_id;
            $landallotment_data['updated_time'] = date('Y-m-d H:i:s');
            $landallotment_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_TWENTYFIVE, $landallotment_id, $user_id, $landallotment_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_TWENTYFIVE, 'fees_bifurcation', $update_data, 'module_id', $landallotment_id);
            }

            $this->utility_model->update_data('landallotment_id', $landallotment_id, 'land_allotment', $landallotment_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $landallotment_data['total_fees'];
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
            $landallotment_id = get_from_post('landallotment_id_for_landallotment_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$landallotment_id || $landallotment_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_landallotment_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_landallotment_approve');
            $update_data['remarks'] = get_from_post('remarks_for_landallotment_approve');
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
            $ex_data = $this->utility_model->get_by_id('landallotment_id', $landallotment_id, 'land_allotment');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWENTYFIVE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('landallotment_id', $landallotment_id, 'land_allotment', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_TWENTYFIVE, $landallotment_id);

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
            $landallotment_id = get_from_post('landallotment_id_for_landallotment_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$landallotment_id || $landallotment_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_landallotment_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }

            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('landallotment_id', $landallotment_id, 'land_allotment');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWENTYFIVE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('landallotment_id', $landallotment_id, 'land_allotment', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_TWENTYFIVE, $landallotment_id);

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
            $landallotment_id = get_from_post('landallotment_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $landallotment_id == null || !$landallotment_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_landallotment_data = $this->utility_model->get_by_id('landallotment_id', $landallotment_id, 'land_allotment');
            if (empty($existing_landallotment_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_landallotment_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $village_data = $this->utility_model->get_by_id('village_id', $existing_landallotment_data['village'], 'villages');
            $existing_landallotment_data['village_name'] = $village_data['village_name'];

            $plot_data = $this->utility_model->get_by_id('plot_id', $existing_landallotment_data['plot_no'], 'plot_numbers');
            $existing_landallotment_data['plot_no'] = $plot_data['plot_no'];
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('landallotment_data' => $existing_landallotment_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('landallotment/certificate', $data, TRUE));
            $mpdf->Output('Landallotment_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->landallotment_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Allotment_of_Plot_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Name',
                'Applicant Address', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_TWENTYFIVE]) ? $prefix_module_array[VALUE_TWENTYFIVE] : '';
                    $list['landallotment_id'] = generate_registration_number($prefix, $list['landallotment_id']);
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