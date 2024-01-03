<?php

class Migrantworkers extends CI_Controller {

    public function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('migrantworkers_model');
        $this->load->model('utility_model');
    }

    public function get_all_migrantworkers() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['migrantworkers_data'] = array();
            if ($user_id == NULL || !$user_id) {
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
            $success_array['migrantworkers_data'] = $this->migrantworkers_model->get_all_migrantworkers_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->migrantworkers_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->migrantworkers_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['migrantworkers_data'], VALUE_THIRTYFOUR);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['migrantworkers_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['migrantworkers_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function submit_migrantworkers() {
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
            $mw_id = get_from_post('mw_id');
            $migrantworkers_data = $this->_get_post_data();
            $validation_message = $this->_check_validation($migrantworkers_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $new_est_cont_data = json_decode($this->input->post('new_contractor_data'), TRUE);
            $exi_est_cont_data = json_decode($this->input->post('exi_contractor_data'), TRUE);
            if (empty($new_est_cont_data) && empty($exi_est_cont_data)) {
                echo json_encode(get_error_array(ONE_CONTRACTOR_MESSAGE));
                return false;
            }
    //        if ($_FILES['seal_and_stamp_for_migrantworkers']['name'] != '') {
    //            $main_path = 'documents/migrantworkers';
    //            if (!is_dir($main_path)) {
    //                mkdir($main_path);
    //                chmod("$main_path", 0755);
    //            }
    //            $this->load->library('upload');
    //            $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_migrantworkers']['name']);
    //            $filename = 'migrantworkers_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
    //            //Change file name
    //            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
    //            if (!move_uploaded_file($_FILES['seal_and_stamp_for_migrantworkers']['tmp_name'], $final_path)) {
    //                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
    //                return;
    //            }
    //            $migrantworkers_data['mw_sign_of_principal_employer'] = $filename;
    //        }
            $this->db->trans_start();
            $migrantworkers_data['status'] = $module_type;
            if (!$mw_id || $mw_id == NULL) {
                $migrantworkers_data['user_id'] = $user_id;
                $migrantworkers_data['mw_declaration'] = VALUE_ONE;
                $migrantworkers_data['created_by'] = $user_id;
                $migrantworkers_data['created_time'] = date('Y-m-d H:i:s');
                $mw_id = $this->utility_model->insert_data('migrantworkers', $migrantworkers_data);
            } else {
                $migrantworkers_data['updated_by'] = $user_id;
                $migrantworkers_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('mw_id', $mw_id, 'migrantworkers', $migrantworkers_data);
            }
            if (!empty($exi_est_cont_data)) {
                $ex_ids = array();
                foreach ($exi_est_cont_data as &$value) {
                    $value['updated_by'] = $user_id;
                    $value['updated_time'] = date('Y-m-d H:i:s');
                    array_push($ex_ids, $value['mc_id']);
                }
                $this->utility_model->update_data_batch('mc_id', 'migrantcontractors', $exi_est_cont_data);
                if (!empty($ex_ids)) {
                    $update_data = array();
                    $update_data['is_delete'] = IS_DELETE;
                    $update_data['updated_by'] = $user_id;
                    $update_data['updated_time'] = date('Y-m-d H:i:s');
                    $this->utility_model->update_data_not_in('mw_id', $mw_id, 'mc_id', $ex_ids, 'migrantcontractors', $update_data);
                }
            }
            if (!empty($new_est_cont_data)) {
                foreach ($new_est_cont_data as &$value) {
                    $value['user_id'] = $user_id;
                    $value['mw_id'] = $mw_id;
                    $value['created_by'] = $user_id;
                    $value['created_time'] = date('Y-m-d H:i:s');
                }
                $this->utility_model->insert_data_batch('migrantcontractors', $new_est_cont_data);
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

    public function _get_post_data() {
        $migrantworkers_data = array();
        $user_type = get_from_session('temp_type_for_eodbsws');
        $migrantworkers_data['district'] = get_from_post('district');
        $migrantworkers_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $migrantworkers_data['mw_name_of_establishment'] = get_from_post('name_of_migrantworkers_registration');
        $migrantworkers_data['mw_nature_of_work_of_establishment'] = get_from_post('nature_of_work_for_migrantworkers_registration');
        $migrantworkers_data['mw_location_of_establishment'] = get_from_post('loaction_for_migrantworkers_registration');
        $migrantworkers_data['mw_postal_address_of_establishment'] = get_from_post('postal_address_for_migrantworkers_registration');
        $migrantworkers_data['mw_principal_employer_name'] = get_from_post('principle_employer_full_name_for_migrantworkers_registration');
        $migrantworkers_data['mw_principal_employer_address'] = get_from_post('principle_employer_address_for_migrantworkers_registration');
        $migrantworkers_data['mw_directors_or_partners_name'] = get_from_post('directors_or_partners_name_migrantworkers_registration');
        $migrantworkers_data['mw_directors_or_partners_address'] = get_from_post('directors_or_partners_address_for_migrantworkers_registration');
        $migrantworkers_data['mw_manager_or_persons_name'] = get_from_post('manager_or_person_full_name_migrantworkers_registration');
        $migrantworkers_data['mw_manager_or_persons_address'] = get_from_post('manager_or_person_address_for_migrantworkers_registration');
        return $migrantworkers_data;
    }

    public function _check_validation($migrantworkers_data) {
        if (!$migrantworkers_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$migrantworkers_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$migrantworkers_data['mw_name_of_establishment']) {
            return ESTABLISHMENT_NAME_MESSAGE;
        }
        if (!$migrantworkers_data['mw_nature_of_work_of_establishment']) {
            return BUSINESS_TYPE_MESSAGE;
        }
        if (!$migrantworkers_data['mw_location_of_establishment']) {
            return ESTABLISHMENT_LOCATION_MESSAGE;
        }
        if (!$migrantworkers_data['mw_postal_address_of_establishment']) {
            return ESTABLISHMENT_POSTAL_ADDRESS_MESSAGE;
        }
        if (!$migrantworkers_data['mw_principal_employer_name']) {
            return PRINCIPLE_EMPLOYER_FULL_NAME_MESSAGE;
        }
        if (!$migrantworkers_data['mw_manager_or_persons_name']) {
            return MANAGER_FULL_NAME_MESSAGE;
        }
        if (!$migrantworkers_data['mw_manager_or_persons_address']) {
            return MANAGER_ADDRESS_MESSAGE;
        }

        return '';
    }

    public function get_migrantworkers_by_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $mw_id = get_from_post('mw_id');
            if (!is_post() || $user_id == null || !$user_id || $mw_id == null || !$mw_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $migrantworkers_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            if (empty($migrantworkers_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $contractor_data = $this->migrantworkers_model->get_migrantworkers_under_all_contractor($user_id, $mw_id);
            if (empty($contractor_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['migrantworkers_data'] = $migrantworkers_data;
            $success_array['contractor_data'] = $contractor_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    public function generate_formI_pdf() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $mw_id = get_from_post('mw_id_for_pdf');
            if (!is_post() || $user_id == null || !$user_id || $mw_id == null || !$mw_id) {
                print_r('Invalid Access');
                return false;
            }
            $this->db->trans_start();
            $existing_migrantworkers_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            $migrantworkers_under_all_contractor = $this->migrantworkers_model->get_migrantworkers_under_all_contractor($user_id, $mw_id);
            if (empty($existing_migrantworkers_data)) {
                print_r('Invalid Access');
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r('Some unexpected database error encountered due to which your transaction could not be complete');

                return;
            }
            error_reporting(E_ERROR);
            $data = array('migrantworkers_data' => $existing_migrantworkers_data, 'migrantworkers_under_all_contractor' => $migrantworkers_under_all_contractor);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('migrantworkers/formI_pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function generate_certificate() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $mw_id = get_from_post('mw_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $mw_id == null || !$mw_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_migrantworkers_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            if (empty($existing_migrantworkers_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_migrantworkers_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('migrantworkers_data' => $existing_migrantworkers_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('migrantworkers/certificate', $data, TRUE));
            $mpdf->Output('migrantworkers_certificate_' . time() . '.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_migrantworkers_data_by_migrantworkers_id() {
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
            $mw_id = get_from_post('mw_id');
            if (!$mw_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $migrantworkers_data = $this->utility_model->get_by_id_with_applicant_name('mw_id', $mw_id, 'migrantworkers');
            if (empty($migrantworkers_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_THIRTYFOUR, 'fees_bifurcation', 'module_id', $mw_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_THIRTYFOUR, $mw_id);
                }
                if ($migrantworkers_data['status'] != VALUE_FOUR && $migrantworkers_data['status'] != VALUE_FIVE &&
                        $migrantworkers_data['status'] != VALUE_SIX && $migrantworkers_data['status'] != VALUE_SEVEN &&
                        $migrantworkers_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        $migrantworkers_data['show_remove_upload_btn'] = true;
                        $migrantworkers_data['show_dropdown'] = true;
                        $migrantworkers_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_THIRTYFOUR, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['migrantworkers_data'] = $migrantworkers_data;
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
            $mw_id = get_from_post('mw_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$mw_id || $mw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'migrantworkers' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('mw_id', $mw_id, 'migrantworkers', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $mw_id = get_from_post('migrantworkers_id_for_migrantworkers_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $mw_id == NULL || !$mw_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_migrantworkers_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $migrantworkers_data = array();
            if ($_FILES['challan_for_migrantworkers_upload_challan']['name'] != '') {
                $main_path = 'documents/migrantworkers/';
    //            if (!is_dir($main_path)) {
    //                mkdir($main_path);
    //                chmod("$main_path", 0755);
    //            }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'migrantworkers';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }

                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_migrantworkers_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_migrantworkers_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $migrantworkers_data['challan'] = $filename;
                $migrantworkers_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $migrantworkers_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $migrantworkers_data['status'] = VALUE_NINE;
            }
            $migrantworkers_data['payment_type'] = $payment_type;
            $migrantworkers_data['updated_by'] = $user_id;
            $migrantworkers_data['updated_time'] = date('Y-m-d H:i:s');
            $migrantworkers_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_THIRTYFOUR, $mw_id, $user_id, $migrantworkers_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_THIRTYFOUR, 'fees_bifurcation', $update_data, 'module_id', $mw_id);
            }

            $this->utility_model->update_data('mw_id', $mw_id, 'migrantworkers', $migrantworkers_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $migrantworkers_data['total_fees'];
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
            $mw_id = get_from_post('migrantworkers_id_for_migrantworkers_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$mw_id || $mw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['mw_registration_no'] = get_from_post('registration_number_for_migrantworkers_approve');
            $update_data['mw_certificate_expiry_date'] = get_from_post('valid_upto_for_migrantworkers_approve');
            $update_data['mw_remark'] = get_from_post('remarks_for_migrantworkers_approve');
            if (!$update_data['mw_registration_no']) {
                echo json_encode(get_error_array(SHOP_REGISTRATION_NO_MESSAGE));
                return false;
            }
            if (!$update_data['mw_certificate_expiry_date']) {
                echo json_encode(get_error_array(DATE_MESSAGE));
                return false;
            }
            if (!$update_data['mw_remark']) {
                echo json_encode(get_error_array(SHOP_REMARK_MESSAGE));
                return false;
            }

            $existing_migrantworkers_data = $this->utility_model->check_registration_number('mw_registration_no', $update_data['mw_registration_no'], 'migrantworkers');
            if (is_array($existing_migrantworkers_data)) {
                if (count(array($existing_migrantworkers_data)) > 0) {
                    echo json_encode(get_error_array(REGISTRATION_NUMBER_EXISTS_MESSAGE));
                    return false;
                }
            }
            $update_data['mw_certificate_expiry_date'] = convert_to_mysql_date_format($update_data['mw_certificate_expiry_date']);
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYFOUR, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('mw_id', $mw_id, 'migrantworkers', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_THIRTYFOUR, $mw_id);
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
            $mw_id = get_from_post('migrantworkers_id_for_migrantworkers_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$mw_id || $mw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['mw_remark'] = get_from_post('remarks_for_migrantworkers_reject');
            if (!$update_data['mw_remark']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYFOUR, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('mw_id', $mw_id, 'migrantworkers', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_THIRTYFOUR, $mw_id);
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

    function remove_document() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $mw_id = get_from_post('mw_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$mw_id || $mw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('mw_id', $mw_id, 'migrantworkers');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = MIGRANTWORKERS_DOC_PATH . $ex_est_data['mw_sign_of_principal_employer'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('mw_id', $mw_id, 'migrantworkers', array('mw_sign_of_principal_employer' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
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
            $excel_data = $this->migrantworkers_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Migrantworkers_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Establishment Name',
                'Establishment Nature of work', 'Principal Employer Name', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_THIRTYFOUR]) ? $prefix_module_array[VALUE_THIRTYFOUR] : '';
                    $list['mw_id'] = generate_registration_number($prefix, $list['mw_id']);
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
* EOF: ./application/controllers/Migrantworkers.php
*/
