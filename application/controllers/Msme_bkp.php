<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Msme extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('msme_model');
    }

    function get_msme_data() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $success_array = array();
        $success_array['msme_data'] = array();
        if ($session_user_id == NULL || !$session_user_id) {
            echo json_encode($success_array);
            return false;
        }
        $session_district = get_from_session('temp_district_for_eodbsws_admin');
        $columns = $this->input->post('columns');
        if (is_admin() || is_view_all_district_user()) {
            $search_district = trim($columns[2]['search']['value']);
            $search_applicant_name = trim($columns[3]['search']['value']);
            $search_applicant_mobile = trim($columns[4]['search']['value']);
            $search_enterprise = trim($columns[5]['search']['value']);
            $search_status = trim($columns[8]['search']['value']);
        } else {
            $search_district = $session_district;
            $search_applicant_name = trim($columns[2]['search']['value']);
            $search_enterprise = trim($columns[3]['search']['value']);
            $search_applicant_mobile = trim($columns[4]['search']['value']);
            $search_status = trim($columns[7]['search']['value']);
        }
        $start = get_from_post('start');
        $length = get_from_post('length');
        $this->db->trans_start();
        $success_array['msme_data'] = $this->msme_model->get_all_msme_list($start, $length, $search_district, $search_applicant_name, $search_applicant_mobile, $search_enterprise, $search_status);
        $success_array['recordsTotal'] = $this->msme_model->get_total_count_of_records($search_district);
        if (($search_district != '' && is_admin()) || $search_applicant_name != '' || $search_applicant_mobile != '' || $search_enterprise != '' || $search_status != '') {
            $success_array['recordsFiltered'] = $this->msme_model->get_filter_count_of_records($search_district, $search_applicant_name, $search_applicant_mobile, $search_enterprise, $search_status);
        } else {
            $success_array['recordsFiltered'] = $success_array['recordsTotal'];
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            $success_array['msme_data'] = array();
            echo json_encode($success_array);
            return;
        }
        echo json_encode($success_array);
    }

    function get_msme_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_start();
        $msme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_generalform');
        if (empty($msme_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array = get_success_array();
        $success_array['msme_data'] = $msme_data;
        echo json_encode($success_array);
    }

    function get_incentive_scheme_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');
        if (empty($scheme_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $scheme_data['encrypt_id'] = $success_array['encrypt_id'];
        $scheme_data['incentive_id'] = $incentive_id;
        $success_array['scheme_data'] = $scheme_data;
        echo json_encode($success_array);
    }

    function get_incentive_parta_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $parta_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parta');
        if (empty($parta_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $parta_data['encrypt_id'] = $success_array['encrypt_id'];
        $parta_data['incentive_id'] = $incentive_id;
        $success_array['parta_data'] = $parta_data;
        echo json_encode($success_array);
    }

    function get_incentive_partb_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $partb_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partb');
        if (empty($partb_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $partb_data['encrypt_id'] = $success_array['encrypt_id'];
        $partb_data['incentive_id'] = $incentive_id;
        $success_array['partb_data'] = $partb_data;
        echo json_encode($success_array);
    }

    function get_incentive_partc_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $partc_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partc');
        if (empty($partc_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $partc_data['encrypt_id'] = $success_array['encrypt_id'];
        $partc_data['incentive_id'] = $incentive_id;
        $success_array['partc_data'] = $partc_data;
        echo json_encode($success_array);
    }

    function get_incentive_partd_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $partd_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partd');
        if (empty($partd_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $partd_data['encrypt_id'] = $success_array['encrypt_id'];
        $partd_data['incentive_id'] = $incentive_id;
        $success_array['partd_data'] = $partd_data;
        echo json_encode($success_array);
    }

    function get_incentive_parte_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        if (empty($parte_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $parte_data['encrypt_id'] = $success_array['encrypt_id'];
        $parte_data['incentive_id'] = $incentive_id;
        $success_array['parte_data'] = $parte_data;
        echo json_encode($success_array);
    }

    function get_incentive_declaration_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');
        if (empty($declaration_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $declaration_data['encrypt_id'] = $success_array['encrypt_id'];
        $declaration_data['incentive_id'] = $incentive_id;
        $success_array['declaration_data'] = $declaration_data;
        echo json_encode($success_array);
    }

    function get_incentive_checklist_data_by_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $success_array = get_success_array();
        $this->db->trans_start();
        $checklist_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_checklist');
        if (empty($checklist_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $checklist_data['encrypt_id'] = $success_array['encrypt_id'];
        $checklist_data['incentive_id'] = $incentive_id;
        $success_array['checklist_data'] = $checklist_data;
        echo json_encode($success_array);
    }

    function submit_msme() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        $msme_data = $this->_get_post_data_for_msme();
        $validation_message = $this->_check_validation_for_msme($msme_data);
        if ($validation_message != '') {
            echo json_encode(get_error_array($validation_message));
            return false;
        }
        if ($msme_data['is_women_entrepreneur'] == IS_CHECKED_YES) {
            if ($_FILES['women_entrepreneur_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['women_entrepreneur_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['women_entrepreneur_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['women_entrepreneur'] = $filename;
            }
        }
        if ($msme_data['is_sc_st_entrepreneur'] == IS_CHECKED_YES) {
            if ($_FILES['sc_st_entrepreneur_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['sc_st_entrepreneur_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['sc_st_entrepreneur_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['sc_st_entrepreneur'] = $filename;
            }
        }
        if ($msme_data['is_physically_entrepreneur'] == IS_CHECKED_YES) {
            if ($_FILES['physically_entrepreneur_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['physically_entrepreneur_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['physically_entrepreneur_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['physically_entrepreneur'] = $filename;
            }
        }
        if ($msme_data['is_transgender_entrepreneur'] == IS_CHECKED_YES) {
            if ($_FILES['transgender_entrepreneur_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['transgender_entrepreneur_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['transgender_entrepreneur_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['transgender_entrepreneur'] = $filename;
            }
        }

        if ($msme_data['is_other_entrepreneur'] == IS_CHECKED_YES) {
            if ($_FILES['other_entrepreneur_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['other_entrepreneur_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['other_entrepreneur_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['other_entrepreneur'] = $filename;
            }
        }

        if ($msme_data['financial_assistance'] == IS_CHECKED_YES) {
            if ($_FILES['financial_assistance_upload_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['financial_assistance_upload_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['financial_assistance_upload_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['financial_assistance_upload'] = $filename;
            }
        }

        if ($msme_data['govt_dues'] == IS_CHECKED_YES) {
            if ($_FILES['govt_dues_upload_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['govt_dues_upload_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['govt_dues_upload_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $msme_data['govt_dues_upload'] = $filename;
            }
        }

        if ($msme_data['is_women_entrepreneur'] == IS_CHECKED_YES || $msme_data['is_sc_st_entrepreneur'] == IS_CHECKED_YES || $msme_data['is_physically_entrepreneur'] == IS_CHECKED_YES || $msme_data['is_transgender_entrepreneur'] == IS_CHECKED_YES) {
            $proprietorShareData = $this->input->post('proprietor_share_data');
            $proprietor_share_decode_Data = json_decode($proprietorShareData, true);
            if ($proprietorShareData == "" || empty($proprietor_share_decode_Data)) {
                echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
                return false;
            }
        }

        $this->db->trans_start();
        $msme_data['emdate_part1'] = convert_to_mysql_date_format($msme_data['emdate_part1']);
        $msme_data['emdate_part2'] = convert_to_mysql_date_format($msme_data['emdate_part2']);
        $msme_data['pccno_date'] = convert_to_mysql_date_format($msme_data['pccno_date']);
        $msme_data['pccno_validupto_date'] = convert_to_mysql_date_format($msme_data['pccno_validupto_date']);
        $msme_data['establishment_date'] = convert_to_mysql_date_format($msme_data['establishment_date']);
        $msme_data['establishment_validupto_date'] = convert_to_mysql_date_format($msme_data['establishment_validupto_date']);
        $msme_data['commencement_date'] = convert_to_mysql_date_format($msme_data['commencement_date']);
        if ($msme_data['is_women_entrepreneur'] == IS_CHECKED_YES || $msme_data['is_sc_st_entrepreneur'] == IS_CHECKED_YES || $msme_data['is_physically_entrepreneur'] == IS_CHECKED_YES || $msme_data['is_transgender_entrepreneur'] == IS_CHECKED_YES) {
            $msme_data['proprietor_share_details'] = $proprietorShareData;
        }
        //$msme_data['user_id'] = $user_id;
        //$msme_data['status'] = $module_type;
//        $msme_data['created_by'] = $user_id;
//        $msme_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_id || $incentive_id == NULL) {
            $incentive_id = $this->utility_model->insert_data('incentive_generalform', $msme_data);
        } else {
            $msme_data['updated_by'] = $user_id;
            $msme_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_id', $incentive_id, 'incentive_generalform', $msme_data);
        }
        $new_msme_scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }

        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $new_msme_scheme_data['incentive_id'] = $incentive_id;
        $new_msme_scheme_data['encrypt_id'] = $success_array['encrypt_id'];
        $success_array['incentive_scheme_data'] = $new_msme_scheme_data;
        echo json_encode($success_array);
    }

    function _get_post_data_for_msme() {
        $msme_data = array();
        $msme_data['enterprise_name'] = get_from_post('enterprise_name');
        $msme_data['office_address'] = get_from_post('office_address');
        $msme_data['office_contactno'] = get_from_post('office_contactno');
        $msme_data['factory_address'] = get_from_post('factory_address');
        $msme_data['factory_contactno'] = get_from_post('factory_contactno');
        $msme_data['fax'] = get_from_post('fax');
        $msme_data['cellphone'] = get_from_post('cellphone');
        $msme_data['email'] = get_from_post('email');
        $msme_data['promoters_details'] = get_from_post('promoters_details');
        $msme_data['othorized_person_detail'] = get_from_post('othorized_person_detail');
        $msme_data['emno_part1'] = get_from_post('emno_part1');
        $msme_data['emdate_part1'] = get_from_post('emdate_part1');
        $msme_data['emno_part2'] = get_from_post('emno_part2');
        $msme_data['emdate_part2'] = get_from_post('emdate_part2');
        $msme_data['manufacturing_items'] = get_from_post('manufacturing_items');
        $msme_data['annual_capacity'] = get_from_post('annual_capacity');
        $msme_data['approval_no'] = get_from_post('approval_no');
        $msme_data['pccno_date'] = get_from_post('pccno_date');
        $msme_data['pccno_validupto_date'] = get_from_post('pccno_validupto_date');
        $msme_data['factory_registration_no'] = get_from_post('factory_registration_no');
        $msme_data['establishment_date'] = get_from_post('establishment_date');
        $msme_data['establishment_validupto_date'] = get_from_post('establishment_validupto_date');
        $msme_data['commencement_date'] = get_from_post('commencement_date');
        $msme_data['bank_name'] = get_from_post('bank_name');
        $msme_data['account_no'] = get_from_post('account_no');
        $msme_data['ifsc_no'] = get_from_post('ifsc_no');
        $msme_data['bankbranch_no'] = get_from_post('bankbranch_no');
        $msme_data['pancard_no'] = get_from_post('pancard_no');

        $msme_data['is_women_entrepreneur'] = get_from_post('is_women_entrepreneur');
        $msme_data['is_sc_st_entrepreneur'] = get_from_post('is_sc_st_entrepreneur');
        $msme_data['is_physically_entrepreneur'] = get_from_post('is_physically_entrepreneur');
        $msme_data['is_transgender_entrepreneur'] = get_from_post('is_transgender_entrepreneur');
        $msme_data['is_other_entrepreneur'] = get_from_post('is_other_entrepreneur');
        $msme_data['constitution'] = get_from_post('constitution');
        $msme_data['unit_type'] = get_from_post('unit_type');
        $msme_data['category'] = get_from_post('category');
        $msme_data['financial_assistance'] = get_from_post('financial_assistance');
        $msme_data['govt_dues'] = get_from_post('govt_dues');
        $msme_data['annual_turnover'] = get_from_post('annual_turnover');
        $msme_data['annual_turnover_one'] = get_from_post('annual_turnover_one');
        $msme_data['annual_turnover_two'] = get_from_post('annual_turnover_two');
        $msme_data['annual_turnover_three'] = get_from_post('annual_turnover_three');
        $msme_data['annual_turnover_four'] = get_from_post('annual_turnover_four');
        $msme_data['district'] = get_from_post('district');
        return $msme_data;
    }

    function _check_validation_for_msme($msme_data) {
        if (!$msme_data['enterprise_name']) {
            return ENTERPRISE_NAME_MESSAGE;
        }
        if (!$msme_data['office_address']) {
            return OFFICE_ADDRESS_MESSAGE;
        }
        if (!$msme_data['office_contactno']) {
            return OFFICE_CONTACT_NO_MESSAGE;
        }
        if (!$msme_data['factory_address']) {
            return FACTORY_ADDRESS_MESSAGE;
        }
        if (!$msme_data['factory_contactno']) {
            return FACTORY_CONTACT_NO_MESSAGE;
        }
        if (!$msme_data['fax']) {
            return FAX_MESSAGE;
        }
        if (!$msme_data['cellphone']) {
            return CELL_PHNO_MESSAGE;
        }
        if (!$msme_data['email']) {
            return EMAIL_MESSAGE;
        }
        if (!$msme_data['promoters_details']) {
            return PROMOTERS_DETAIL_MESSAGE;
        }
        if (!$msme_data['othorized_person_detail']) {
            return OTHORIZED_PERSON_DETAIL_MESSAGE;
        }
        if (!$msme_data['emno_part1']) {
            return EM_NO_MESSAGE;
        }
        if (!$msme_data['emdate_part1']) {
            return EM_DATE_MESSAGE;
        }
        if (!$msme_data['emno_part2']) {
            return EM_NO_MESSAGE;
        }
        if (!$msme_data['emdate_part2']) {
            return EM_DATE_MESSAGE;
        }
        if (!$msme_data['manufacturing_items']) {
            return MANUFACTURING_ITEM_MESSAGE;
        }
        if (!$msme_data['annual_capacity']) {
            return ANNUAL_CAPACITY_MESSAGE;
        }
        if (!$msme_data['approval_no']) {
            return APPROVAL_NO_MESSAGE;
        }
        if (!$msme_data['pccno_date']) {
            return PCC_DATE_MESSAGE;
        }
        if (!$msme_data['pccno_validupto_date']) {
            return PCC_VALIDUPTO_DATE_MESSAGE;
        }
        if (!$msme_data['factory_registration_no']) {
            return FACTORY_NO_MESSAGE;
        }
        if (!$msme_data['establishment_date']) {
            return ESTABLISHMENTS_DATE_MESSAGE;
        }
        if (!$msme_data['establishment_validupto_date']) {
            return ESTABLISHMENT_VALIDUPTO_DATE_MESSAGE;
        }
        if (!$msme_data['commencement_date']) {
            return COMMENCEMENT_DATE_MESSAGE;
        }
        if (!$msme_data['bank_name']) {
            return NAME_OF_BANK_MESSAGE;
        }
        if (!$msme_data['account_no']) {
            return BANK_ACCOUNT_NO_MESSAGE;
        }
        if (!$msme_data['ifsc_no']) {
            return IFSC_CODE_MESSAGE;
        }
        if (!$msme_data['bankbranch_no']) {
            return BRANCH_CODE_MESSAGE;
        }
        if (!$msme_data['pancard_no']) {
            return PAN_CARD_MESSAGE;
        }
        if (!$msme_data['annual_turnover']) {
            return TURNOVER_MESSAGE;
        }
        if (!$msme_data['annual_turnover_one']) {
            return TURNOVER_MESSAGE;
        }
        if (!$msme_data['annual_turnover_two']) {
            return TURNOVER_MESSAGE;
        }
        if (!$msme_data['annual_turnover_three']) {
            return TURNOVER_MESSAGE;
        }
        if (!$msme_data['annual_turnover_four']) {
            return TURNOVER_MESSAGE;
        }

        return '';
    }

    function submit_incentive_scheme() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_scheme_id = get_from_post('incentive_scheme_id');
        $scheme_data = $this->_get_post_data_for_scheme();
        // $validation_message = $this->_check_validation_for_scheme($scheme_data);
        // if ($validation_message != '') {
        //     echo json_encode(get_error_array($validation_message));
        //     return false;
        // }


        $this->db->trans_start();
        $incentive_id = $scheme_data['incentive_id'];
        //$scheme_data['user_id'] = $user_id;
        //$scheme_data['status'] = $module_type;
        $scheme_data['created_by'] = $user_id;
        $scheme_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_scheme_id || $incentive_scheme_id == NULL) {
            $incentive_scheme_id = $this->utility_model->insert_data('incentive_scheme', $scheme_data);
        } else {
            $scheme_data['updated_by'] = $user_id;
            $scheme_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_scheme_id', $incentive_scheme_id, 'incentive_scheme', $scheme_data);
        }
        $new_scheme_data = $this->utility_model->get_by_id('incentive_scheme_id', $incentive_scheme_id, 'incentive_scheme');
        $scheme_flag = '';
        if ($new_scheme_data['parta_form'] == 1) {
            $scheme_flag = 'parta_form';
            $new_msme_parta_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parta');
        } else if ($new_scheme_data['partb_form'] == 1) {
            $scheme_flag = 'partb_form';
            $new_msme_partb_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partb');
        } else if ($new_scheme_data['partc_form'] == 1) {
            $scheme_flag = 'partc_form';
            $new_msme_partc_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partc');
        } else if ($new_scheme_data['partd_form'] == 1) {
            $scheme_flag = 'partd_form';
            $new_msme_partd_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partd');
        } else if ($new_scheme_data['parte_form'] == 1) {
            $scheme_flag = 'parte_form';
            $new_msme_parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        } else {
            $scheme_flag = 'declaration_form';
            $new_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');
        }

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));

            return;
        }
        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $success_array['scheme_flag'] = $scheme_flag;

        if ($new_scheme_data['parta_form'] == 1) {
            $new_msme_parta_data['incentive_id'] = $incentive_id;
            $new_msme_parta_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_parta_data'] = $new_msme_parta_data;
        } else if ($new_scheme_data['partb_form'] == 1) {
            $new_msme_partb_data['incentive_id'] = $incentive_id;
            $new_msme_partb_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partb_data'] = $new_msme_partb_data;
        } else if ($new_scheme_data['partc_form'] == 1) {
            $new_msme_partc_data['incentive_id'] = $incentive_id;
            $new_msme_partc_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partc_data'] = $new_msme_partc_data;
        } else if ($new_scheme_data['partd_form'] == 1) {
            $new_msme_partd_data['incentive_id'] = $incentive_id;
            $new_msme_partd_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partd_data'] = $new_msme_partd_data;
        } else if ($new_scheme_data['parte_form'] == 1) {
            $new_msme_parte_data['incentive_id'] = $incentive_id;
            $new_msme_parte_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_parte_data'] = $new_msme_parte_data;
        } else {
            $new_msme_declaration_data['incentive_id'] = $incentive_id;
            $new_msme_declaration_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['declaration_data'] = $new_msme_declaration_data;
        }

        echo json_encode($success_array);
    }

    function _get_post_data_for_scheme() {
        $msme_data = array();
        $msme_data['incentive_id'] = get_from_post('incentive_id');
        $msme_data['parta_form'] = get_from_post('parta_form');
        $msme_data['partb_form'] = get_from_post('partb_form');
        $msme_data['partc_form'] = get_from_post('partc_form');
        $msme_data['partd_form'] = get_from_post('partd_form');
        $msme_data['parte_form'] = get_from_post('parte_form');

        return $msme_data;
    }

    function submit_msme_parta() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_parta_id = get_from_post('incentive_parta_id');
        $incentive_parta_data = $this->_get_post_data_for_incentive_parta();
        $validation_message = $this->_check_validation_for_incentive_parta($incentive_parta_data);
        if ($validation_message != '') {
            echo json_encode(get_error_array($validation_message));
            return false;
        }


        $financialInstitution = $this->input->post('financial_institution_data');
        $financial_institution_decode_Data = json_decode($financialInstitution, true);
        if ($financialInstitution == "" || empty($financial_institution_decode_Data)) {
            echo json_encode(get_error_array('Enter Atlist One Financial Institution Detail'));
            return false;
        }

        $this->db->trans_start();
        $incentive_id = $incentive_parta_data['incentive_id'];
        $incentive_parta_data['term_loan_date'] = convert_to_mysql_date_format($incentive_parta_data['term_loan_date']);
        $incentive_parta_data['commencement_date'] = convert_to_mysql_date_format($incentive_parta_data['commencement_date']);
        $incentive_parta_data['disbursement_date'] = convert_to_mysql_date_format($incentive_parta_data['disbursement_date']);
        $incentive_parta_data['financial_data_info'] = $financialInstitution;
        //$incentive_parta_data['user_id'] = $user_id;
        //$incentive_parta_data['status'] = $module_type;
        $incentive_parta_data['created_by'] = $user_id;
        $incentive_parta_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_parta_id || $incentive_parta_id == NULL) {
            $incentive_parta_id = $this->utility_model->insert_data('incentive_parta', $incentive_parta_data);
        } else {
            $incentive_parta_data['updated_by'] = $user_id;
            $incentive_parta_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_parta_id', $incentive_parta_id, 'incentive_parta', $incentive_parta_data);
        }
        $new_scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');
        $scheme_flag = '';
        if ($new_scheme_data['partb_form'] == 1) {
            $scheme_flag = 'partb_form';
            $new_msme_partb_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partb');
        } else if ($new_scheme_data['partc_form'] == 1) {
            $scheme_flag = 'partc_form';
            $new_msme_partc_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partc');
        } else if ($new_scheme_data['partd_form'] == 1) {
            $scheme_flag = 'partd_form';
            $new_msme_partd_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partd');
        } else if ($new_scheme_data['parte_form'] == 1) {
            $scheme_flag = 'parte_form';
            $new_msme_parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        } else {
            $scheme_flag = 'declaration_form';
            $new_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');
        }

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));

            return;
        }
        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $success_array['scheme_flag'] = $scheme_flag;

        if ($new_scheme_data['partb_form'] == 1) {
            $new_msme_partb_data['incentive_id'] = $incentive_id;
            $new_msme_partb_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partb_data'] = $new_msme_partb_data;
        } else if ($new_scheme_data['partc_form'] == 1) {
            $new_msme_partc_data['incentive_id'] = $incentive_id;
            $new_msme_partc_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partc_data'] = $new_msme_partc_data;
        } else if ($new_scheme_data['partd_form'] == 1) {
            $new_msme_partd_data['incentive_id'] = $incentive_id;
            $new_msme_partd_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partd_data'] = $new_msme_partd_data;
        } else if ($new_scheme_data['parte_form'] == 1) {
            $new_msme_parte_data['incentive_id'] = $incentive_id;
            $new_msme_parte_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_parte_data'] = $new_msme_parte_data;
        } else {
            $new_msme_declaration_data['incentive_id'] = $incentive_id;
            $new_msme_declaration_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['declaration_data'] = $new_msme_declaration_data;
        }

        echo json_encode($success_array);
    }

    function _get_post_data_for_incentive_parta() {
        $incentive_parta_data = array();
        $incentive_parta_data['incentive_id'] = get_from_post('incentive_id');
        $incentive_parta_data['enterprise_name'] = get_from_post('enterprise_name');
        $incentive_parta_data['enterprise_category'] = get_from_post('enterprise_category');
        if ($incentive_parta_data['enterprise_category'] == VALUE_ONE) {
            $incentive_parta_data['investment'] = get_from_post('investment');
        }
        if ($incentive_parta_data['enterprise_category'] == VALUE_TWO || $incentive_parta_data['enterprise_category'] == VALUE_THREE || $incentive_parta_data['enterprise_category'] == VALUE_FOUR) {
            $incentive_parta_data['machinery_units'] = get_from_post('machinery_units');
            $incentive_parta_data['new_investment'] = get_from_post('new_investment');
            $incentive_parta_data['investment_percentage'] = get_from_post('investment_percentage');
        }
        $incentive_parta_data['contribution'] = get_from_post('contribution');
        $incentive_parta_data['term_loan'] = get_from_post('term_loan');
        $incentive_parta_data['unsecured_loan'] = get_from_post('unsecured_loan');
        $incentive_parta_data['accruals'] = get_from_post('accruals');
        $incentive_parta_data['finance_total'] = get_from_post('finance_total');
        $incentive_parta_data['term_loan_date'] = get_from_post('term_loan_date');
        $incentive_parta_data['loan_accountno'] = get_from_post('loan_accountno');
        $incentive_parta_data['capital_subsidy'] = get_from_post('capital_subsidy');
        $incentive_parta_data['anum'] = get_from_post('anum');
        $incentive_parta_data['cliam_amount_total'] = get_from_post('cliam_amount_total');
        $incentive_parta_data['commencement_date'] = get_from_post('commencement_date');
        $incentive_parta_data['disbursement_date'] = get_from_post('disbursement_date');

        return $incentive_parta_data;
    }

    function _check_validation_for_incentive_parta($incentive_parta_data) {
        if (!$incentive_parta_data['enterprise_name']) {
            return ENTERPRISE_NAME_MESSAGE;
        }
        if ($incentive_parta_data['enterprise_category'] == VALUE_ONE) {
            if (!$incentive_parta_data['investment']) {
                return OFFICE_ADDRESS_MESSAGE;
            }
        }
        if ($incentive_parta_data['enterprise_category'] == VALUE_TWO || $incentive_parta_data['enterprise_category'] == VALUE_THREE || $incentive_parta_data['enterprise_category'] == VALUE_FOUR) {
            if (!$incentive_parta_data['machinery_units']) {
                return OFFICE_CONTACT_NO_MESSAGE;
            }
            if (!$incentive_parta_data['new_investment']) {
                return FACTORY_ADDRESS_MESSAGE;
            }
            if (!$incentive_parta_data['investment_percentage']) {
                return FACTORY_CONTACT_NO_MESSAGE;
            }
        }
        if (!$incentive_parta_data['contribution']) {
            return FAX_MESSAGE;
        }
        if (!$incentive_parta_data['term_loan']) {
            return CELL_PHNO_MESSAGE;
        }
        if (!$incentive_parta_data['unsecured_loan']) {
            return EMAIL_MESSAGE;
        }
        if (!$incentive_parta_data['accruals']) {
            return PROMOTERS_DETAIL_MESSAGE;
        }
        if (!$incentive_parta_data['finance_total']) {
            return OTHORIZED_PERSON_DETAIL_MESSAGE;
        }
        if (!$incentive_parta_data['term_loan_date']) {
            return EM_NO_MESSAGE;
        }
        if (!$incentive_parta_data['loan_accountno']) {
            return EM_DATE_MESSAGE;
        }
        if (!$incentive_parta_data['capital_subsidy']) {
            return EM_NO_MESSAGE;
        }
        if (!$incentive_parta_data['anum']) {
            return EM_DATE_MESSAGE;
        }
        if (!$incentive_parta_data['cliam_amount_total']) {
            return MANUFACTURING_ITEM_MESSAGE;
        }
        if (!$incentive_parta_data['commencement_date']) {
            return ANNUAL_CAPACITY_MESSAGE;
        }
        if (!$incentive_parta_data['disbursement_date']) {
            return APPROVAL_NO_MESSAGE;
        }


        return '';
    }

    function submit_msme_partb() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_partb_id = get_from_post('incentive_partb_id');
        $incentive_partb_data = $this->_get_post_data_for_incentive_partb();
        $validation_message = $this->_check_validation_for_incentive_partb($incentive_partb_data);
        if ($validation_message != '') {
            echo json_encode(get_error_array($validation_message));
            return false;
        }

        $this->db->trans_start();
        $incentive_id = $incentive_partb_data['incentive_id'];
        $incentive_partb_data['iso_certificate_date'] = convert_to_mysql_date_format($incentive_partb_data['iso_certificate_date']);
        $incentive_partb_data['isi_certificate_date'] = convert_to_mysql_date_format($incentive_partb_data['isi_certificate_date']);
        //$incentive_partb_data['user_id'] = $user_id;
        //$incentive_partb_data['status'] = $module_type;
        $incentive_partb_data['created_by'] = $user_id;
        $incentive_partb_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_partb_id || $incentive_partb_id == NULL) {
            $incentive_partb_id = $this->utility_model->insert_data('incentive_partb', $incentive_partb_data);
        } else {
            $incentive_partb_data['updated_by'] = $user_id;
            $incentive_partb_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_partb_id', $incentive_partb_id, 'incentive_partb', $incentive_partb_data);
        }
        $new_scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');
        $scheme_flag = '';
        if ($new_scheme_data['partc_form'] == 1) {
            $scheme_flag = 'partc_form';
            $new_msme_partc_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partc');
        } else if ($new_scheme_data['partd_form'] == 1) {
            $scheme_flag = 'partd_form';
            $new_msme_partd_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partd');
        } else if ($new_scheme_data['parte_form'] == 1) {
            $scheme_flag = 'parte_form';
            $new_msme_parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        } else {
            $scheme_flag = 'declaration_form';
            $new_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');
        }

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));

            return;
        }
        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $success_array['scheme_flag'] = $scheme_flag;

        if ($new_scheme_data['partc_form'] == 1) {
            $new_msme_partc_data['incentive_id'] = $incentive_id;
            $new_msme_partc_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partc_data'] = $new_msme_partc_data;
        } else if ($new_scheme_data['partd_form'] == 1) {
            $new_msme_partd_data['incentive_id'] = $incentive_id;
            $new_msme_partd_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partd_data'] = $new_msme_partd_data;
        } else if ($new_scheme_data['parte_form'] == 1) {
            $new_msme_parte_data['incentive_id'] = $incentive_id;
            $new_msme_parte_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_parte_data'] = $new_msme_parte_data;
        } else {
            $new_msme_declaration_data['incentive_id'] = $incentive_id;
            $new_msme_declaration_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['declaration_data'] = $new_msme_declaration_data;
        }

        echo json_encode($success_array);
    }

    function _get_post_data_for_incentive_partb() {
        $incentive_partb_data = array();
        $incentive_partb_data['incentive_id'] = get_from_post('incentive_id');
        $incentive_partb_data['supplier_name'] = get_from_post('supplier_name');
        $incentive_partb_data['features'] = get_from_post('features');
        $incentive_partb_data['iso_agency_name'] = get_from_post('iso_agency_name');
        $incentive_partb_data['iso_product_detail'] = get_from_post('iso_product_detail');
        $incentive_partb_data['iso_certificate_no'] = get_from_post('iso_certificate_no');
        $incentive_partb_data['iso_certificate_date'] = get_from_post('iso_certificate_date');
        $incentive_partb_data['isi_agency_name'] = get_from_post('isi_agency_name');
        $incentive_partb_data['isi_product_detail'] = get_from_post('isi_product_detail');
        $incentive_partb_data['isi_certificate_no'] = get_from_post('isi_certificate_no');
        $incentive_partb_data['isi_certificate_date'] = get_from_post('isi_certificate_date');
        $incentive_partb_data['expenditure'] = get_from_post('expenditure');
        $incentive_partb_data['capital_cost'] = get_from_post('capital_cost');
        $incentive_partb_data['consutancy_fees'] = get_from_post('consutancy_fees');
        $incentive_partb_data['certification_charges'] = get_from_post('certification_charges');
        $incentive_partb_data['testing_equipments'] = get_from_post('testing_equipments');
        $incentive_partb_data['cliam_amount_total'] = get_from_post('cliam_amount_total');

        return $incentive_partb_data;
    }

    function _check_validation_for_incentive_partb($incentive_partb_data) {
        if (!$incentive_partb_data['supplier_name']) {
            return SUPPLIER_NAME_ADDRESS_MESSAGE;
        }
        if (!$incentive_partb_data['features']) {
            return FEATURE_SYSTEM_MESSAGE;
        }
        if (!$incentive_partb_data['iso_agency_name']) {
            return AGENCY_NAME_ADDRESS_MESSAGE;
        }
        if (!$incentive_partb_data['iso_product_detail']) {
            return PRODUCT_DETAIL_MESSAGE;
        }
        if (!$incentive_partb_data['iso_certificate_no']) {
            return ISO_CERTIFICATE_NO_MESSAGE;
        }
        if (!$incentive_partb_data['iso_certificate_date']) {
            return ISO_CERTIFICATE_DATE_MESSAGE;
        }
        if (!$incentive_partb_data['isi_agency_name']) {
            return AGENCY_NAME_ADDRESS_MESSAGE;
        }
        if (!$incentive_partb_data['isi_product_detail']) {
            return PRODUCT_DETAIL_MESSAGE;
        }
        if (!$incentive_partb_data['isi_certificate_no']) {
            return ISI_CERTIFICATE_NO_MESSAGE;
        }
        if (!$incentive_partb_data['isi_certificate_date']) {
            return ISI_CERTIFICATE_DATE_MESSAGE;
        }
        if (!$incentive_partb_data['expenditure']) {
            return EXPENDITURE_MESSAGE;
        }
        if (!$incentive_partb_data['capital_cost']) {
            return CAPITAL_COST_MESSAGE;
        }
        if (!$incentive_partb_data['consutancy_fees']) {
            return CONSUTANCY_MESSAGE;
        }
        if (!$incentive_partb_data['certification_charges']) {
            return CERTIFICATION_CHARGES_MESSAGE;
        }
        if (!$incentive_partb_data['testing_equipments']) {
            return TESTING_EQUIPMENTS_MESSAGE;
        }
        if (!$incentive_partb_data['cliam_amount_total']) {
            return CLAM_AMOUNT_TOTAL_MESSAGE;
        }


        return '';
    }

    function submit_msme_partc() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_partc_id = get_from_post('incentive_partc_id');
        $incentive_partc_data = $this->_get_post_data_for_incentive_partc();
        $validation_message = $this->_check_validation_for_incentive_partc($incentive_partc_data);
        if ($validation_message != '') {
            echo json_encode(get_error_array($validation_message));
            return false;
        }

        $this->db->trans_start();
        $incentive_id = $incentive_partc_data['incentive_id'];
        $incentive_partc_data['registration_date'] = convert_to_mysql_date_format($incentive_partc_data['registration_date']);
        //$incentive_partc_data['user_id'] = $user_id;
        //$incentive_partc_data['status'] = $module_type;
        $incentive_partc_data['created_by'] = $user_id;
        $incentive_partc_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_partc_id || $incentive_partc_id == NULL) {
            $incentive_partc_id = $this->utility_model->insert_data('incentive_partc', $incentive_partc_data);
        } else {
            $incentive_partc_data['updated_by'] = $user_id;
            $incentive_partc_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_partc_id', $incentive_partc_id, 'incentive_partc', $incentive_partc_data);
        }
        $new_scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');
        $scheme_flag = '';
        if ($new_scheme_data['partd_form'] == 1) {
            $scheme_flag = 'partd_form';
            $new_msme_partd_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partd');
        } else if ($new_scheme_data['parte_form'] == 1) {
            $scheme_flag = 'parte_form';
            $new_msme_parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        } else {
            $scheme_flag = 'declaration_form';
            $new_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');
        }

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));

            return;
        }
        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $success_array['scheme_flag'] = $scheme_flag;

        if ($new_scheme_data['partd_form'] == 1) {
            $new_msme_partd_data['incentive_id'] = $incentive_id;
            $new_msme_partd_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_partd_data'] = $new_msme_partd_data;
        } else if ($new_scheme_data['parte_form'] == 1) {
            $new_msme_parte_data['incentive_id'] = $incentive_id;
            $new_msme_parte_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_parte_data'] = $new_msme_parte_data;
        } else {
            $new_msme_declaration_data['incentive_id'] = $incentive_id;
            $new_msme_declaration_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['declaration_data'] = $new_msme_declaration_data;
        }

        echo json_encode($success_array);
    }

    function _get_post_data_for_incentive_partc() {
        $incentive_partc_data = array();
        $incentive_partc_data['incentive_id'] = get_from_post('incentive_id');
        $incentive_partc_data['registration_no'] = get_from_post('registration_no');
        $incentive_partc_data['registration_date'] = get_from_post('registration_date');
        $incentive_partc_data['patent_name'] = get_from_post('patent_name');
        $incentive_partc_data['product_name'] = get_from_post('product_name');
        $incentive_partc_data['patent_expenditure'] = get_from_post('patent_expenditure');
        $incentive_partc_data['claim_amount'] = get_from_post('claim_amount');

        return $incentive_partc_data;
    }

    function _check_validation_for_incentive_partc($incentive_partc_data) {
        if (!$incentive_partc_data['registration_no']) {
            return REGISTRATION_NO_MESSAGE;
        }
        if (!$incentive_partc_data['registration_date']) {
            return CERTIFICATE_DATE_MESSAGE;
        }
        if (!$incentive_partc_data['patent_name']) {
            return PATENT_NAME_MESSAGE;
        }
        if (!$incentive_partc_data['product_name']) {
            return PRODUCT_NAME_MESSAGE;
        }
        if (!$incentive_partc_data['patent_expenditure']) {
            return PATENT_EXPENDITURE_MESSAGE;
        }
        if (!$incentive_partc_data['claim_amount']) {
            return CLIAM_AMOUNT_MESSAGE;
        }

        return '';
    }

    function submit_msme_partd() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_partd_id = get_from_post('incentive_partd_id');
        $incentive_partd_data = $this->_get_post_data_for_incentive_partd();
        $validation_message = $this->_check_validation_for_incentive_partd($incentive_partd_data);
        if ($validation_message != '') {
            echo json_encode(get_error_array($validation_message));
            return false;
        }

        $equipment = $this->input->post('equipment_data');
        $equipment_decode_Data = json_decode($equipment, true);
        if ($equipment == "" || empty($equipment_decode_Data)) {
            echo json_encode(get_error_array('Enter Atlist One Equipments Detail'));
            return false;
        }
        if ($_FILES['audit_report_for_msme']['name'] != '') {
            $main_path = 'documents/msme';
            // if (!is_dir($main_path)) {
            //     mkdir($main_path);
            //     chmod("$main_path", 0755);
            // }
            $documents_path = 'documents';
            if (!is_dir($documents_path)) {
                mkdir($documents_path);
                chmod($documents_path, 0777);
            }
            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
            if (!is_dir($module_path)) {
                mkdir($module_path);
                chmod($module_path, 0777);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['audit_report_for_msme']['name']);
            $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['audit_report_for_msme']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $incentive_partd_data['audit_report'] = $filename;
        }

        $this->db->trans_start();
        $incentive_id = $incentive_partd_data['incentive_id'];
        $incentive_partd_data['equipment_info'] = $equipment;
        //$incentive_partd_data['user_id'] = $user_id;
        //$incentive_partd_data['status'] = $module_type;
        $incentive_partd_data['created_by'] = $user_id;
        $incentive_partd_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_partd_id || $incentive_partd_id == NULL) {
            $incentive_partd_id = $this->utility_model->insert_data('incentive_partd', $incentive_partd_data);
        } else {
            $incentive_partd_data['updated_by'] = $user_id;
            $incentive_partd_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_partd_id', $incentive_partd_id, 'incentive_partd', $incentive_partd_data);
        }
        $new_scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');
        $scheme_flag = '';
        if ($new_scheme_data['parte_form'] == 1) {
            $scheme_flag = 'parte_form';
            $new_msme_parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        } else {
            $scheme_flag = 'declaration_form';
            $new_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');
        }

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));

            return;
        }
        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $success_array['scheme_flag'] = $scheme_flag;

        if ($new_scheme_data['parte_form'] == 1) {
            $new_msme_parte_data['incentive_id'] = $incentive_id;
            $new_msme_parte_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['incentive_parte_data'] = $new_msme_parte_data;
        } else {
            $new_msme_declaration_data['incentive_id'] = $incentive_id;
            $new_msme_declaration_data['encrypt_id'] = $success_array['encrypt_id'];
            $success_array['declaration_data'] = $new_msme_declaration_data;
        }

        echo json_encode($success_array);
    }

    function _get_post_data_for_incentive_partd() {
        $incentive_partd_data = array();
        $incentive_partd_data['incentive_id'] = get_from_post('incentive_id');
        $incentive_partd_data['consultant_name'] = get_from_post('consultant_name');
        $incentive_partd_data['suggestion'] = get_from_post('suggestion');
        $incentive_partd_data['result_benefit'] = get_from_post('result_benefit');
        $incentive_partd_data['total_expenditure'] = get_from_post('total_expenditure');
        $incentive_partd_data['audit_fees'] = get_from_post('audit_fees');
        $incentive_partd_data['equipment_cost'] = get_from_post('equipment_cost');
        $incentive_partd_data['cliam_amount_total'] = get_from_post('cliam_amount_total');

        return $incentive_partd_data;
    }

    function _check_validation_for_incentive_partd($incentive_partd_data) {
        if (!$incentive_partd_data['consultant_name']) {
            return CONSULTANT_NAME_MESSAGE;
        }
        if (!$incentive_partd_data['suggestion']) {
            return SUGGESTION_MESSAGE;
        }
        if (!$incentive_partd_data['result_benefit']) {
            return RESULT_BENEFIT_MESSAGE;
        }
        if (!$incentive_partd_data['total_expenditure']) {
            return TOTAL_EXPENDITURE_MESSAGE;
        }
        if (!$incentive_partd_data['audit_fees']) {
            return AUDIT_FEES_MESSAGE;
        }
        if (!$incentive_partd_data['equipment_cost']) {
            return EQUIPMENT_COST_MESSAGE;
        }
        if (!$incentive_partd_data['cliam_amount_total']) {
            return CLIAM_AMOUNT_MESSAGE;
        }

        return '';
    }

    function submit_msme_parte() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_parte_id = get_from_post('incentive_parte_id');
        $incentive_parte_data = $this->_get_post_data_for_incentive_parte();
        $validation_message = $this->_check_validation_for_incentive_parte($incentive_parte_data);
        if ($validation_message != '') {
            echo json_encode(get_error_array($validation_message));
            return false;
        }

        $this->db->trans_start();
        $incentive_id = $incentive_parte_data['incentive_id'];
        //$incentive_parte_data['user_id'] = $user_id;
        //$incentive_parte_data['status'] = $module_type;
        $incentive_parte_data['created_by'] = $user_id;
        $incentive_parte_data['created_time'] = date('Y-m-d H:i:s');
        if (!$incentive_parte_id || $incentive_parte_id == NULL) {
            $incentive_parte_id = $this->utility_model->insert_data('incentive_parte', $incentive_parte_data);
        } else {
            $incentive_parte_data['updated_by'] = $user_id;
            $incentive_parte_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('incentive_parte_id', $incentive_parte_id, 'incentive_parte', $incentive_parte_data);
        }
        $new_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }

        // $success_array = get_success_array();
        // $success_array['message'] = $module_type == VALUE_ONE ? APP_DRAFT_MESSAGE : APP_SUBMITTED_MESSAGE;
        // echo json_encode($success_array);

        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $new_msme_declaration_data['incentive_id'] = $incentive_id;
        $new_msme_declaration_data['encrypt_id'] = $success_array['encrypt_id'];
        $success_array['declaration_data'] = $new_msme_declaration_data;
        echo json_encode($success_array);
    }

    function _get_post_data_for_incentive_parte() {
        $incentive_parte_data = array();
        $incentive_parte_data['incentive_id'] = get_from_post('incentive_id');
        $incentive_parte_data['newly_requit_emp'] = get_from_post('newly_requit_emp');
        $incentive_parte_data['emp_total_expenditure'] = get_from_post('emp_total_expenditure');
        $incentive_parte_data['assclaim_amount'] = get_from_post('assclaim_amount');

        return $incentive_parte_data;
    }

    function _check_validation_for_incentive_parte($incentive_parte_data) {
        if (!$incentive_parte_data['newly_requit_emp']) {
            return REQUIT_EMP_MESSAGE;
        }
        if (!$incentive_parte_data['emp_total_expenditure']) {
            return EMP_EXPENDITURE_MESSAGE;
        }
        if (!$incentive_parte_data['assclaim_amount']) {
            return ASSCLAIM_AMOUNT_MESSAGE;
        }

        return '';
    }

    function submit_msme_declaration() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $declaration_id = get_from_post('declaration_id');

        if ($_FILES['sign_seal_for_msme']['name'] != '') {
            $main_path = 'documents/msme';
            // if (!is_dir($main_path)) {
            //     mkdir($main_path);
            //     chmod("$main_path", 0755);
            // }
            $documents_path = 'documents';
            if (!is_dir($documents_path)) {
                mkdir($documents_path);
                chmod($documents_path, 0777);
            }
            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
            if (!is_dir($module_path)) {
                mkdir($module_path);
                chmod($module_path, 0777);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['sign_seal_for_msme']['name']);
            $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['sign_seal_for_msme']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $declaration_data['sign_seal'] = $filename;
        }

        $this->db->trans_start();
        $incentive_id = get_from_post('incentive_id');
        $declaration_data['incentive_id'] = $incentive_id;
        //$declaration_data['user_id'] = $user_id;
        //$declaration_data['status'] = $module_type;
        $declaration_data['created_by'] = $user_id;
        $declaration_data['created_time'] = date('Y-m-d H:i:s');
        if (!$declaration_id || $declaration_id == NULL) {
            $declaration_id = $this->utility_model->insert_data('msme_declaration', $declaration_data);
        } else {
            $declaration_data['updated_by'] = $user_id;
            $declaration_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('declaration_id', $declaration_id, 'msme_declaration', $declaration_data);
        }
        $new_msme_checklist_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_checklist');

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }

        // $success_array = get_success_array();
        // $success_array['message'] = $module_type == VALUE_ONE ? APP_DRAFT_MESSAGE : APP_SUBMITTED_MESSAGE;
        // echo json_encode($success_array);

        $success_array = get_success_array();
        $success_array['encrypt_id'] = get_encrypt_id($incentive_id);
        $new_msme_checklist_data['incentive_id'] = $incentive_id;
        $new_msme_checklist_data['encrypt_id'] = $success_array['encrypt_id'];
        $success_array['checklist_data'] = $new_msme_checklist_data;
        echo json_encode($success_array);
    }

    function submit_msme_checklist() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $module_type = get_from_post('module_type');
        if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $checklist_id = get_from_post('checklist_id');
        $is_capital_investment = get_from_post('is_capital_investment');
        $is_intrest_subsidy = get_from_post('is_intrest_subsidy');

        $checklist_data['is_capital_investment'] = $is_capital_investment;
        $checklist_data['is_intrest_subsidy'] = $is_intrest_subsidy;
        if ($is_capital_investment == IS_CHECKED_YES) {
            if ($_FILES['entrepreneur_memorandum_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['entrepreneur_memorandum_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['entrepreneur_memorandum_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['entrepreneur_memorandum_uploader'] = $filename;
            }
            if ($_FILES['partnership_deed_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['partnership_deed_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['partnership_deed_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['partnership_deed_uploader'] = $filename;
            }
            if ($_FILES['lease_agreement_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['lease_agreement_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['lease_agreement_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['lease_agreement_uploader'] = $filename;
            }
            if ($_FILES['loan_sanction_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['loan_sanction_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['loan_sanction_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['loan_sanction_uploader'] = $filename;
            }
            if ($_FILES['power_release_order_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['power_release_order_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['power_release_order_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['power_release_order_uploader'] = $filename;
            }
            if ($_FILES['invoice_copy_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['invoice_copy_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['invoice_copy_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['invoice_copy_uploader'] = $filename;
            }
            if ($_FILES['ca_prescribed_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['ca_prescribed_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['ca_prescribed_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['ca_prescribed_uploader'] = $filename;
            }
            if ($_FILES['certificate_commencement_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['certificate_commencement_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['certificate_commencement_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['certificate_commencement_uploader'] = $filename;
            }
            if ($_FILES['engineer_certificate_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['engineer_certificate_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['engineer_certificate_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['engineer_certificate_uploader'] = $filename;
            }
            if ($_FILES['expenses_certificate_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['expenses_certificate_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['expenses_certificate_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['expenses_certificate_uploader'] = $filename;
            }
            if ($_FILES['stamped_receipt_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['stamped_receipt_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['stamped_receipt_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['stamped_receipt_uploader'] = $filename;
            }
            if ($_FILES['sale_invoice_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['sale_invoice_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['sale_invoice_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['sale_invoice_uploader'] = $filename;
            }
            if ($_FILES['additional_document_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['additional_document_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['additional_document_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['additional_document_uploader'] = $filename;
            }
            if ($_FILES['factorylicence_copy_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['factorylicence_copy_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['factorylicence_copy_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['factorylicence_copy_uploader'] = $filename;
            }
            if ($_FILES['pcc_copy_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['pcc_copy_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['pcc_copy_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['pcc_copy_uploader'] = $filename;
            }
            if ($_FILES['expansion_date_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['expansion_date_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['expansion_date_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['expansion_date_uploader'] = $filename;
            }
            if ($_FILES['production_turnover_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['production_turnover_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['production_turnover_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['production_turnover_uploader'] = $filename;
            }
            if ($_FILES['fix_assets_value_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['fix_assets_value_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['fix_assets_value_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['fix_assets_value_uploader'] = $filename;
            }
            if ($_FILES['production_capacity_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['production_capacity_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['production_capacity_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['production_capacity_uploader'] = $filename;
            }
            if ($_FILES['patent_registration_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['patent_registration_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['patent_registration_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['patent_registration_uploader'] = $filename;
            }
            if ($_FILES['energy_water_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['energy_water_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['energy_water_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['energy_water_uploader'] = $filename;
            }
            if ($_FILES['quality_certificate_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['quality_certificate_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['quality_certificate_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['quality_certificate_uploader'] = $filename;
            }
            if ($_FILES['resident_certificate_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['resident_certificate_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['resident_certificate_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['resident_certificate_uploader'] = $filename;
            }
        }
        if ($is_intrest_subsidy == IS_CHECKED_YES) {
            if ($_FILES['bank_total_interest_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['bank_total_interest_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['bank_total_interest_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['bank_total_interest_uploader'] = $filename;
            }
            if ($_FILES['bank_statement_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['bank_statement_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['bank_statement_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['bank_statement_uploader'] = $filename;
            }
            if ($_FILES['annexure3_declaration_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['annexure3_declaration_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['annexure3_declaration_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['annexure3_declaration_uploader'] = $filename;
            }
            if ($_FILES['interest_subsidy_cal_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['interest_subsidy_cal_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['interest_subsidy_cal_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['interest_subsidy_cal_uploader'] = $filename;
            }
            if ($_FILES['year_annual_prod_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['year_annual_prod_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['year_annual_prod_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['year_annual_prod_uploader'] = $filename;
            }
            if ($_FILES['year_bank_statement_uploader_for_msme']['name'] != '') {
                $main_path = 'documents/msme';
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['year_bank_statement_uploader_for_msme']['name']);
                $filename = 'msme_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['year_bank_statement_uploader_for_msme']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $checklist_data['year_bank_statement_uploader'] = $filename;
            }
        }

        $this->db->trans_start();
        $incentive_id = get_from_post('incentive_id');
        $checklist_data['incentive_id'] = $incentive_id;
        //$checklist_data['user_id'] = $user_id;
        //$checklist_data['status'] = $module_type;
        $checklist_data['created_by'] = $user_id;
        $checklist_data['created_time'] = date('Y-m-d H:i:s');
        if (!$checklist_id || $checklist_id == NULL) {
            $checklist_id = $this->utility_model->insert_data('msme_checklist', $checklist_data);
        } else {
            $checklist_data['updated_by'] = $user_id;
            $checklist_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('checklist_id', $checklist_id, 'msme_checklist', $checklist_data);
        }

        $msme_update_data = array();
        $msme_update_data['updated_by'] = $user_id;
        $msme_update_data['updated_time'] = date('Y-m-d H:i:s');
        $msme_update_data['status'] = $module_type;

        $this->utility_model->update_data('incentive_id', $incentive_id, 'incentive_generalform', $msme_update_data);

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }

        $success_array = get_success_array();
        $success_array['message'] = $module_type == VALUE_ONE ? APP_DRAFT_MESSAGE : APP_SUBMITTED_MESSAGE;
        echo json_encode($success_array);
    }

    function remove_document() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id');
        $document_id = get_from_post('document_id');
        $table_name = get_from_post('table_name');
        if (!is_post() || $session_user_id == NULL || !$session_user_id || !$incentive_id || $incentive_id == NULL) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_start();
        $ex_est_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, $table_name);
        if (empty($ex_est_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $file_path = 'documents' . DIRECTORY_SEPARATOR . 'msme' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data[$document_id];

        if (file_exists($file_path)) {
            unlink($file_path);
        }
        $this->utility_model->update_data('incentive_id', $incentive_id, $table_name, array($document_id => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));

        $success_array = get_success_array();
        $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
        echo json_encode($success_array);
    }

    function generate_form1() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id_for_msme_form1');
        if (!is_post() || $user_id == null || !$user_id || $incentive_id == null || !$incentive_id) {
            print_r(INVALID_ACCESS_MESSAGE);
            return false;
        }
        $this->db->trans_start();
        // $existing_msme_parta_data = '';
        // $existing_msme_partb_data = '';
        // $existing_msme_partc_data = '';
        // $existing_msme_partd_data = '';
        // $existing_msme_parte_data = '';

        $existing_msme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_generalform');
        $existing_scheme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_scheme');
        //if($existing_scheme_data['parta_form'] == 1){
        $existing_msme_parta_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parta');
        // }
        // else if($existing_scheme_data['partb_form'] == 1){
        $existing_msme_partb_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partb');
        // }
        // else if($existing_scheme_data['partc_form'] == 1){
        $existing_msme_partc_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partc');
        // }
        // else if($existing_scheme_data['partd_form'] == 1){
        $existing_msme_partd_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_partd');
        // }
        // else if($existing_scheme_data['parte_form'] == 1){
        $existing_msme_parte_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_parte');
        //}
        $existing_msme_declaration_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'msme_declaration');


        if (empty($existing_msme_data)) {
            print_r(INVALID_ACCESS_MESSAGE);
            return;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === false) {
            print_r(DATABASE_ERROR_MESSAGE);
            return;
        }
        error_reporting(E_ERROR);
        $data = array();
        $result = array_merge($existing_msme_data, $existing_msme_parta_data, $existing_msme_partb_data, $existing_msme_partc_data, $existing_msme_partd_data, $existing_msme_parte_data, $existing_msme_declaration_data);
        $data = array('msme_data' => $result);
        //var_dump($data);
        //$data = array('msme_data' => $existing_msme_data);
        $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
        $mpdf->WriteHTML($this->load->view('msme/pdf', $data, TRUE));
        $mpdf->Output('FORM-I.pdf', 'I');
    }

    function get_msme_data_by_msme_id() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $session_user_id == NULL || !$session_user_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $incentive_id = get_from_post('incentive_id');
        if (!$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_start();
        $msme_data = $this->utility_model->get_by_id_with_applicant_name('incentive_id', $incentive_id, 'incentive_generalform');
        if (empty($msme_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $success_array = get_success_array();
        $success_array['msme_data'] = $msme_data;
        echo json_encode($success_array);
    }

    function remove_challan() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id');
        if (!is_post() || $session_user_id == NULL || !$session_user_id || !$incentive_id || $incentive_id == NULL) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_start();
        $ex_est_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_generalform');
        if (empty($ex_est_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $file_path = 'documents' . DIRECTORY_SEPARATOR . 'msme' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
        if (file_exists($file_path)) {
            unlink($file_path);
        }
        $this->utility_model->update_data('incentive_id', $incentive_id, 'incentive_generalform', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
        $success_array = get_success_array();
        $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
        echo json_encode($success_array);
    }

    function upload_challan() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id_for_msme_upload_challan');
        if (!is_post() || $user_id == NULL || !$user_id || $incentive_id == NULL || !$incentive_id) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $payment_type = get_from_post('payment_type_for_msme_upload_challan');
        if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO) {
            echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
            return false;
        }
        $msme_data = array();
        if ($_FILES['challan_for_msme_upload_challan']['name'] != '') {
            $main_path = 'documents/msme';
            // if (!is_dir($main_path)) {
            //     mkdir($main_path);
            //     chmod("$main_path", 0755);
            // }
            $documents_path = 'documents';
            if (!is_dir($documents_path)) {
                mkdir($documents_path);
                chmod($documents_path, 0777);
            }
            $module_path = $documents_path . DIRECTORY_SEPARATOR . 'msme';
            if (!is_dir($module_path)) {
                mkdir($module_path);
                chmod($module_path, 0777);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['challan_for_msme_upload_challan']['name']);
            $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['challan_for_msme_upload_challan']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $msme_data['status'] = VALUE_THREE;
            $msme_data['challan'] = $filename;
            $msme_data['challan_updated_date'] = date('Y-m-d H:i:s');
        }
        $msme_data['payment_type'] = $payment_type;
        $msme_data['updated_by'] = $user_id;
        $msme_data['updated_time'] = date('Y-m-d H:i:s');
        $this->db->trans_start();
        $this->utility_model->update_data('incentive_id', $incentive_id, 'incentive_generalform', $msme_data);
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return;
        }
        $success_array = get_success_array();
        $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
        echo json_encode($success_array);
    }

    function approve_application() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id_for_msme_approve');
        if (!is_post() || $session_user_id == NULL || !$session_user_id || !$incentive_id || $incentive_id == NULL) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $update_data = array();
        $update_data['registration_number'] = get_from_post('registration_number_for_msme_approve');
        $update_data['valid_upto'] = get_from_post('valid_upto_for_msme_approve');
        $update_data['remarks'] = get_from_post('remarks_for_msme_approve');
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
        $ex_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_generalform');
        if (empty($ex_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_NINE, $ex_data['submitted_datetime']);
        $update_data['status'] = VALUE_FIVE;
        $update_data['status_datetime'] = date('Y-m-d H:i:s');
        $update_data['updated_by'] = $session_user_id;
        $update_data['updated_time'] = date('Y-m-d H:i:s');
        $this->utility_model->update_data('incentive_id', $incentive_id, 'incentive_generalform', $update_data);

        $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_NINE, $incentive_id);

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
    }

    function reject_application() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id_for_msme_reject');
        if (!is_post() || $session_user_id == NULL || !$session_user_id || !$incentive_id || $incentive_id == NULL) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $update_data = array();
        $update_data['remarks'] = get_from_post('remarks_for_msme_reject');
        if (!$update_data['remarks']) {
            echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
            return false;
        }
        $this->db->trans_start();
        $ex_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_generalform');
        if (empty($ex_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_NINE, $ex_data['submitted_datetime']);
        $update_data['status'] = VALUE_SIX;
        $update_data['status_datetime'] = date('Y-m-d H:i:s');
        $update_data['updated_by'] = $session_user_id;
        $update_data['updated_time'] = date('Y-m-d H:i:s');
        $this->utility_model->update_data('incentive_id', $incentive_id, 'incentive_generalform', $update_data);

        $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_NINE, $incentive_id);

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
    }

    function generate_certificate() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        $incentive_id = get_from_post('incentive_id_for_certificate');
        if (!is_post() || $user_id == null || !$user_id || $incentive_id == null || !$incentive_id) {
            print_r(INVALID_ACCESS_MESSAGE);
            return false;
        }
        $this->db->trans_start();
        $existing_msme_data = $this->utility_model->get_by_id('incentive_id', $incentive_id, 'incentive_generalform');
        if (empty($existing_msme_data)) {
            print_r(INVALID_ACCESS_MESSAGE);
            return;
        }
        if ($existing_msme_data['status'] != VALUE_FIVE) {
            print_r(INVALID_ACCESS_MESSAGE);
            return;
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === false) {
            print_r(DATABASE_ERROR_MESSAGE);
            return;
        }
        error_reporting(E_ERROR);
        $data = array('msme_data' => $existing_msme_data);
        $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
        $mpdf->WriteHTML($this->load->view('msme/certificate', $data, TRUE));
        $mpdf->Output('Msme_certificate_' . time() . '.pdf', 'I');
    }

    function generate_excel() {
        $user_id = get_from_session('temp_id_for_eodbsws_admin');
        if (!is_post() || $user_id == null || !$user_id) {
            print_r(INVALID_ACCESS_MESSAGE);
            return false;
        }
        $session_district = get_from_session('temp_district_for_eodbsws_admin');
        $this->db->trans_start();
        $excel_data = $this->msme_model->get_records_for_excel($session_district);
        $this->db->trans_complete();
        if ($this->db->trans_status() === false) {
            print_r(INVALID_ACCESS_MESSAGE);
            return;
        }
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=Msme_Report_' . date('Y-m-d H:i:s') . '.csv');
        $output = fopen("php://output", "w");
        fputcsv($output, array('Application Number', 'District', 'Applicant Name', 'Mobile Number', 'Enterprise Name',
            'Office Address', 'Submitted On', 'Status', 'Query Status'));
        if (!empty($excel_data)) {
            $taluka_array = $this->config->item('taluka_array');
            $app_status_text_array = $this->config->item('app_status_text_array');
            $query_status_text_array = $this->config->item('query_status_text_array');
            $prefix_module_array = $this->config->item('prefix_module_array');
            foreach ($excel_data as $list) {
                $prefix = isset($prefix_module_array[VALUE_NINE]) ? $prefix_module_array[VALUE_NINE] : '';
                $list['incentive_id'] = generate_registration_number($prefix, $list['incentive_id']);
                $list['district'] = isset($taluka_array[$list['district']]) ? $taluka_array[$list['district']] : '-';
                $list['submitted_datetime'] = convert_to_new_datetime_format($list['submitted_datetime']);
                $list['status'] = isset($app_status_text_array[$list['status']]) ? $app_status_text_array[$list['status']] : '-';
                $list['query_status'] = isset($query_status_text_array[$list['query_status']]) ? $query_status_text_array[$list['query_status']] : '-';
                fputcsv($output, $list);
            }
        }
        fclose($output);
    }

}

/*
 * EOF: ./application/controller/BOCW.php
 */