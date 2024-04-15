<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Factorylicense_renewal extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('factory_license_renewal_model');
    }

    function get_factory_license_renewal_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['factory_license_renewal_data'] = array();
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
            $success_array['factory_license_renewal_data'] = $this->factory_license_renewal_model->get_all_factory_license_renewal_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->factory_license_renewal_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->factory_license_renewal_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['factory_license_renewal_data'], VALUE_FOURTYONE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['factory_license_renewal_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['factory_license_renewal_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_factory_license_data_by_id() {
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
            $license_number = get_from_post('license_number');
            if (!$license_number) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $factory_license_renewal_data = $this->utility_model->get_by_id('registration_number', $license_number, 'factorylicence');
            // if (empty($factory_license_renewal_data)) {
            //     echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            //     return false;
            // }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['factory_license_data'] = $factory_license_renewal_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_factory_license_renewal_data_by_id() {
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
            $factory_license_renewal_id = get_from_post('factorylicense_id');
            if (!$factory_license_renewal_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $this->db->trans_start();
            $factory_license_renewal_data = $this->utility_model->get_by_id('factorylicence_renewal_id', $factory_license_renewal_id, 'factorylicence_renewal');
            if (empty($factory_license_renewal_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array['factory_license_renewal_data'] = $factory_license_renewal_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_factory_license_renewal() {
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

            $factorylicence_renewal_id = get_from_post('factorylicence_renewal_id');
            $factory_license_renewal_data = $this->_get_post_data_for_factory_license_renewal();
            $validation_message = $this->_check_validation_for_factory_license_renewal($factory_license_renewal_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            //         if ($_FILES['sign_of_manager_for_fl']['name'] != '') {
            //             $main_path = 'documents/factorylicense';
            // //            if (!is_dir($main_path)) {
            // //                mkdir($main_path);
            // //                chmod("$main_path", 0755);
            // //            }
            //             $documents_path = 'documents';
            //             if (!is_dir($documents_path)) {
            //                 mkdir($documents_path);
            //                 chmod($documents_path, 0777);
            //             }
            //             $module_path = $documents_path . DIRECTORY_SEPARATOR . 'factorylicense';
            //             if (!is_dir($module_path)) {
            //                 mkdir($module_path);
            //                 chmod($module_path, 0777);
            //             }
            //             $this->load->library('upload');
            //             $temp_filename = str_replace('_', '', $_FILES['sign_of_manager_for_fl']['name']);
            //             $filename = 'factorylicense_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //             //Change file name
            //             $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //             if (!move_uploaded_file($_FILES['sign_of_manager_for_fl']['tmp_name'], $final_path)) {
            //                 echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //                 return;
            //             }
            //             $factory_license_renewal_data['sign_of_manager'] = $filename;
            //         } 
            //         if ($_FILES['sign_of_occupier_for_fl']['name'] != '') {
            //             $main_path = 'documents/factorylicense';
            // //            if (!is_dir($main_path)) {
            // //                mkdir($main_path);
            // //                chmod("$main_path", 0755);
            // //            }
            //             $documents_path = 'documents';
            //             if (!is_dir($documents_path)) {
            //                 mkdir($documents_path);
            //                 chmod($documents_path, 0777);
            //             }
            //             $module_path = $documents_path . DIRECTORY_SEPARATOR . 'factorylicense';
            //             if (!is_dir($module_path)) {
            //                 mkdir($module_path);
            //                 chmod($module_path, 0777);
            //             }
            //             $this->load->library('upload');
            //             $temp_filename = str_replace('_', '', $_FILES['sign_of_occupier_for_fl']['name']);
            //             $filename = 'factorylicense_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //             //Change file name
            //             $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            //             if (!move_uploaded_file($_FILES['sign_of_occupier_for_fl']['tmp_name'], $final_path)) {
            //                 echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
            //                 return;
            //             }
            //             $factory_license_renewal_data['sign_of_occupier'] = $filename;
            //         } 

            $this->db->trans_start();
            // $factory_license_renewal_data['user_id'] = $user_id;
            // $factory_license_renewal_data['status'] = $module_type;
            if (!$factorylicence_renewal_id || $factorylicence_renewal_id == NULL) {
                $factory_license_renewal_data['created_by'] = $user_id;
                $factory_license_renewal_data['created_time'] = date('Y-m-d H:i:s');
                $factorylicence_renewal_id = $this->utility_model->insert_data('factorylicence_renewal', $factory_license_renewal_data);
            } else {
                $factory_license_renewal_data['updated_by'] = $user_id;
                $factory_license_renewal_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal', $factory_license_renewal_data);
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

    function _get_post_data_for_factory_license_renewal() {
        $factory_license_renewal_data = array();
        $factory_license_renewal_data['district'] = get_from_post('district');
        $factory_license_renewal_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $factory_license_renewal_data['registration_number'] = get_from_post('registration_number');
        $factory_license_renewal_data['name_of_factory'] = get_from_post('name_of_factory');
        $factory_license_renewal_data['factory_address'] = get_from_post('factory_address');
        $factory_license_renewal_data['factory_postal_address'] = get_from_post('factory_postal_address');
        $factory_license_renewal_data['max_no_of_worker_year'] = get_from_post('max_no_of_worker_year');
        $factory_license_renewal_data['max_power_to_be_used'] = get_from_post('max_power_to_be_used');
        $factory_license_renewal_data['manager_detail'] = get_from_post('manager_detail');
        $factory_license_renewal_data['occupier_detail'] = get_from_post('occupier_detail');
        return $factory_license_renewal_data;
    }

    function _check_validation_for_factory_license_renewal($factory_license_renewal_data) {
        if (!$factory_license_renewal_data['district']) {
            return SELECT_DISTRICT;
        }
        if (!$factory_license_renewal_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$factory_license_renewal_data['registration_number']) {
            return LICENSE_NUMBER_MESSAGE;
        }
        if (!$factory_license_renewal_data['name_of_factory']) {
            return FACTORY_NAME_MESSAGE;
        }
        if (!$factory_license_renewal_data['factory_address']) {
            return FACTORY_ADDRESS_MESSAGE;
        }
        if (!$factory_license_renewal_data['max_no_of_worker_year']) {
            return MAX_WORKER_MESSAGE;
        }
        if (!$factory_license_renewal_data['max_power_to_be_used']) {
            return POWER_MESSAGE;
        }
        if (!$factory_license_renewal_data['manager_detail']) {
            return MANAGER_MESSAGE;
        }
        if (!$factory_license_renewal_data['occupier_detail']) {
            return OCCUPIER_MESSAGE;
        }
        return '';
    }

    function generate_form1() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $factorylicence_renewal_id = get_from_post('factorylicense_renewal_id_for_factorylicense_renewal_form1');
            if (!is_post() || $user_id == null || !$user_id || $factorylicence_renewal_id == null || !$factorylicence_renewal_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_factory_license_renewal_data = $this->utility_model->get_by_id('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal');

            if (empty($existing_factory_license_renewal_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('factorylicense_renewal_data' => $existing_factory_license_renewal_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('factorylicense_renewal/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_factorylicense_renewal_data_by_factorylicense_renewal_id() {
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
            $factorylicence_renewal_id = get_from_post('factorylicence_renewal_id');
            if (!$factorylicence_renewal_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $factory_license_renewal_data = $this->utility_model->get_by_id_with_applicant_name('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal');
            if (empty($factory_license_renewal_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTYONE, 'fees_bifurcation', 'module_id', $factorylicence_renewal_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FOURTYONE, $factorylicence_renewal_id);
                }
                if ($factory_license_renewal_data['status'] != VALUE_FOUR && $factory_license_renewal_data['status'] != VALUE_FIVE &&
                        $factory_license_renewal_data['status'] != VALUE_SIX && $factory_license_renewal_data['status'] != VALUE_SEVEN &&
                        $factory_license_renewal_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($factory_license_renewal_data['status'] != VALUE_ELEVEN) {
                            $factory_license_renewal_data['show_remove_upload_btn'] = true;
                        }
                        $factory_license_renewal_data['show_dropdown'] = true;
                        $factory_license_renewal_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTYONE, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['factory_license_renewal_data'] = $factory_license_renewal_data;
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
            $factorylicence_renewal_id = get_from_post('factorylicence_renewal_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$factorylicence_renewal_id || $factorylicence_renewal_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'factorylicence' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $factorylicence_renewal_id = get_from_post('factorylicence_renewal_id_for_factory_license_renewal_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $factorylicence_renewal_id == NULL || !$factorylicence_renewal_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_factory_license_renewal_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $factory_license_renewal_data = array();
            if ($_FILES['challan_for_factory_license_renewal_upload_challan']['name'] != '') {
                $main_path = 'documents/factorylicense';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'factorylicense';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_factory_license_renewal_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_factory_license_renewal_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $factory_license_renewal_data['challan'] = $filename;
                $factory_license_renewal_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $factory_license_renewal_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $factory_license_renewal_data['status'] = VALUE_NINE;
            }
            $factory_license_renewal_data['payment_type'] = $payment_type;
            $factory_license_renewal_data['updated_by'] = $user_id;
            $factory_license_renewal_data['updated_time'] = date('Y-m-d H:i:s');
            $factory_license_renewal_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FOURTYONE, $factorylicence_renewal_id, $user_id, $factory_license_renewal_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FOURTYONE, 'fees_bifurcation', $update_data, 'module_id', $factorylicence_renewal_id);
            }

            $this->utility_model->update_data('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal', $factory_license_renewal_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $factory_license_renewal_data['total_fees'];
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
            $factorylicence_renewal_id = get_from_post('factory_license_renewal_id_for_factory_license_renewal_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$factorylicence_renewal_id || $factorylicence_renewal_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_factory_license_renewal_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_factory_license_renewal_approve');
            $update_data['remarks'] = get_from_post('remarks_for_factory_license_renewal_approve');
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
            $ex_data = $this->utility_model->get_by_id('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($_FILES['certificate_file_for_factory_license_renewal_approve']['name'] == '') {
                echo json_encode(get_error_array(UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['certificate_file_for_factory_license_renewal_approve']['size'];
            if ($evidence_size == 0) {
                echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $main_path = 'certificate';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $ad_path = $main_path . DIRECTORY_SEPARATOR . 'wm';
            if (!is_dir($ad_path)) {
                mkdir($ad_path);
                chmod("$ad_path", 0755);

                $file = DIRECTORY_SEPARATOR . 'index.html';
                $temp_path = $main_path . $file;
                chmod($temp_path, 0755);
                copy($temp_path, $ad_path . $file);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['certificate_file_for_factory_license_renewal_approve']['name']);
            $filename = 'flrc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $ad_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['certificate_file_for_factory_license_renewal_approve']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $update_data['certificate_file'] = $filename;
            $temp_fc_filename = 'temp_flrfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            error_reporting(E_ERROR);
            $data = array('factorylicence_renewal_data' => $ex_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('factorylicense_renewal/qr_barcode', $data, TRUE));
            $temp_fc_path = $ad_path . DIRECTORY_SEPARATOR . $temp_fc_filename;

            // Save Temporary QR Code File
            $mpdf->Output($temp_fc_path, 'F');

            $temp_files_to_merge = array();
            array_push($temp_files_to_merge, $temp_fc_path);
            array_push($temp_files_to_merge, $final_path);
            $final_certificate_filename = 'flrfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            $final_filepath = FCPATH . $ad_path . DIRECTORY_SEPARATOR . $final_certificate_filename;

            // Merge QR Code File with Uploaded Certificate
            merge_pdf($final_filepath, $temp_files_to_merge);

            // Remove Temporary QR Code File
            if (file_exists($temp_fc_path)) {
                unlink($temp_fc_path);
            }

            $update_data['final_certificate'] = $final_certificate_filename;
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYONE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FOURTYONE, $factorylicence_renewal_id);
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
            $factorylicence_renewal_id = get_from_post('factory_license_renewal_id_for_factory_license_renewal_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$factorylicence_renewal_id || $factorylicence_renewal_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_factory_license_renewal_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYONE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FOURTYONE, $factorylicence_renewal_id);
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
            $factorylicence_renewal_id = get_from_post('factorylicense_renewal_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $factorylicence_renewal_id == null || !$factorylicence_renewal_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_factorylicence_renewal_data = $this->utility_model->get_by_id('factorylicence_renewal_id', $factorylicence_renewal_id, 'factorylicence_renewal');
            if (empty($existing_factorylicence_renewal_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_factorylicence_renewal_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('factorylicence_renewal_data' => $existing_factorylicence_renewal_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('factorylicense_renewal/certificate', $data, TRUE));
            $mpdf->Output('Factorylicense_certificate_' . time() . '.pdf', 'D');
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
            $excel_data = $this->factory_license_renewal_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Factories_License_Renewal_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Factory Name',
                'Factory Address', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FOURTYONE]) ? $prefix_module_array[VALUE_FOURTYONE] : '';
                    $list['factorylicence_renewal_id'] = generate_registration_number($prefix, $list['factorylicence_renewal_id']);
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