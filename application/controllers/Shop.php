<?php

class Shop extends CI_Controller {

    public function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('shop_model');
        $this->load->model('utility_model');
    }

    public function get_all_shop() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['shop_data'] = array();
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
            $success_array['shop_data'] = $this->shop_model->get_all_shop_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->shop_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->shop_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['shop_data'], VALUE_THIRTYTHREE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['shop_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['shop_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    public function submit_shop() {
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
            $s_id = get_from_post('s_id');
            $shop_data = $this->_get_post_data();
            $validation_message = $this->_check_validation($shop_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            $this->db->trans_start();
            $shop_data['s_employers_family_details'] = $this->input->post('employer_family_info_data');
            $shop_data['s_employees_details'] = $this->input->post('employees_info_data');
            $shop_data['multiple_partner'] = $this->input->post('partner_info_data');
            $shop_data['s_commencement_of_business_date'] = convert_to_mysql_date_format($shop_data['s_commencement_of_business_date']);
            $shop_data['status'] = $module_type;
            if (!$s_id || $s_id == NULL) {
                $shop_data['user_id'] = $user_id;
                $shop_data['s_declaration'] = VALUE_ONE;
                $shop_data['created_by'] = $user_id;
                $shop_data['created_time'] = date('Y-m-d H:i:s');
                $s_id = $this->utility_model->insert_data('shop', $shop_data);
            } else {
                $shop_data['updated_by'] = $user_id;
                $shop_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('s_id', $s_id, 'shop', $shop_data);
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
        $shop_data = array();
        $shop_data['district'] = get_from_post('district');
        $shop_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $shop_data['regi_category'] = get_from_post('regi_category');
        $shop_data['s_name'] = get_from_post('name_for_shop');
        $shop_data['s_door_no'] = get_from_post('door_no_for_shop');
        $shop_data['s_street_name'] = get_from_post('street_name_for_shop');
        $shop_data['s_location'] = get_from_post('loaction_for_shop');
        $shop_data['s_postal_address'] = get_from_post('postal_address_for_shop');
        $shop_data['s_different_location'] = get_from_post('different_location_for_shop');
        if ($shop_data['s_different_location'] == IS_CHECKED_YES) {
            $shop_data['s_different_location_office'] = get_from_post('office_location_for_shop');
            $shop_data['s_different_location_store_room'] = get_from_post('store_room_location_for_shop');
            $shop_data['s_different_location_godown'] = get_from_post('godown_location_for_shop');
            $shop_data['s_different_location_warehouse'] = get_from_post('warehouse_location_for_shop');
        } else {
            $shop_data['s_different_location_office'] = '';
            $shop_data['s_different_location_store_room'] = '';
            $shop_data['s_different_location_godown'] = '';
            $shop_data['s_different_location_warehouse'] = '';
        }

        $shop_data['s_employer_name'] = get_from_post('name_of_employer_for_shop');
        $shop_data['s_employer_mobile_no'] = get_from_post('mobile_no_employer_for_shop');
        $shop_data['s_employer_residential_address'] = get_from_post('residential_address_employer_for_shop');
        $shop_data['s_manager_name'] = get_from_post('manager_name_for_shop');
        $shop_data['s_manager_residential_address'] = get_from_post('residential_address_manager_for_shop');
        $shop_data['s_category'] = get_from_post('category_for_shop');
        $shop_data['s_nature_of_business'] = get_from_post('nature_of_business_for_shop');
        $shop_data['s_commencement_of_business_date'] = get_from_post('date_commencement_of_business_for_shop');
        return $shop_data;
    }

    public function _check_validation($shop_data) {
        if (!$shop_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$shop_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$shop_data['regi_category']) {
            return SHOP_REGISTRATION_CATEGORY_MESSAGE;
        }
        if (!$shop_data['s_name']) {
            return SHOP_NAME_MESSAGE;
        }
        if (!$shop_data['s_door_no']) {
            return SHOP_DOOR_NO_MESSAGE;
        }
        if (!$shop_data['s_street_name']) {
            return SHOP_STREET_NAME_MESSAGE;
        }
        if (!$shop_data['s_location']) {
            return SHOP_LOCATION_MESSAGE;
        }
        if (!$shop_data['s_postal_address']) {
            return SHOP_POSTAL_ADDRESS_MESSAGE;
        }
        if ($shop_data['s_different_location'] == IS_CHECKED_YES) {
            if (!$shop_data['s_different_location_office']) {
                return SHOP_OFFICE_LOCATION_MESSAGE;
            }
            if (!$shop_data['s_different_location_store_room']) {
                return SHOP_STORE_ROOM_LOCATION_MESSAGE;
            }
            if (!$shop_data['s_different_location_godown']) {
                return SHOP_GODOWN_LOCATION_MESSAGE;
            }
            if (!$shop_data['s_different_location_warehouse']) {
                return SHOP_WAREHOUSE_LOCATION_MESSAGE;
            }
        }

        if (!$shop_data['s_employer_name']) {
            return SHOP_EMPLOYER_NAME_MESSAGE;
        }
        if (!$shop_data['s_employer_mobile_no']) {
            return MOBILE_NUMBER_MESSAGE;
        }
        if (!$shop_data['s_employer_residential_address']) {
            return SHOP_EMPLOYER_RESIDENTIAL_ADDRESS_MESSAGE;
        }
        if (!$shop_data['s_manager_name']) {
            return SHOP_MANAGER_NAME_MESSAGE;
        }
        if (!$shop_data['s_manager_residential_address']) {
            return SHOP_MANAGER_RESIDENTIAL_ADDRESS_MESSAGE;
        }
        if (!$shop_data['s_category']) {
            return SHOP_CATEGORY_MESSAGE;
        }
        if (!$shop_data['s_nature_of_business']) {
            return SHOP_NATURE_OF_BUSINESS_MESSAGE;
        }
        if (!$shop_data['s_commencement_of_business_date']) {
            return SHOP_DATE_COMMENCEMENT_OF_BUSINESS_MESSAGE;
        }

        return '';
    }

    function get_shop_data_by_shop_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $s_id = get_from_post('s_id');
            if (!is_post() || $session_user_id == null || !$session_user_id || $s_id == null || !$s_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $shop_data = $this->utility_model->get_by_id_with_applicant_name('s_id', $s_id, 'shop');
            if (empty($shop_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_THIRTYTHREE, 'fees_bifurcation', 'module_id', $s_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_THIRTYTHREE, $s_id);
                }
                if ($shop_data['status'] != VALUE_FOUR && $shop_data['status'] != VALUE_FIVE &&
                        $shop_data['status'] != VALUE_SIX && $shop_data['status'] != VALUE_SEVEN &&
                        $shop_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($shop_data['status'] != VALUE_ELEVEN) {
                            $shop_data['show_remove_upload_btn'] = true;
                        }
                        $shop_data['show_dropdown'] = true;
                        $shop_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_THIRTYTHREE, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['shop_data'] = $shop_data;
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

    public function generate_FormI_pdf() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $s_id = get_from_post('s_id_for_formI_pdf');
            if (!is_post() || $user_id == null || !$user_id || $s_id == null || !$s_id) {
                print_r('Invalid Access');
                return false;
            }
            $this->db->trans_start();
            $existing_shop_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($existing_shop_data)) {
                print_r('Invalid Access');
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r('Some unexpected database error encountered due to which your transaction could not be complete');
                return;
            }
            error_reporting(E_ERROR);
            $data = array('shop_data' => $existing_shop_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('shop/formI_pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public function generate_FormII_pdf() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $s_id = get_from_post('s_id_for_formII_pdf');
            if (!is_post() || $user_id == null || !$user_id || $s_id == null || !$s_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_shop_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($existing_shop_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('shop_data' => $existing_shop_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('shop/certificate', $data, TRUE));
            $mpdf->Output('Certificate.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public function generate_FormXXIV_pdf() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $s_id = get_from_post('s_id_for_formXXIV_pdf');
            if (!is_post() || $user_id == null || !$user_id || $s_id == null || !$s_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_shop_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($existing_shop_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);

                return;
            }
            error_reporting(E_ERROR);
            $data = array('shop_data' => $existing_shop_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('shop/formXXIV_pdf', $data, TRUE));
            $mpdf->Output('FORM-XXIV.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    public function generate_FormIV_pdf() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $s_id = get_from_post('s_id_for_formIV_pdf');
            if (!is_post() || $user_id == null || !$user_id || $s_id == null || !$s_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_shop_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($existing_shop_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);

                return;
            }
            error_reporting(E_ERROR);
            $data = array('shop_data' => $existing_shop_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('shop/formIV_pdf', $data, TRUE));
            $mpdf->Output('FORM-IV.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
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
            $s_id = get_from_post('s_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$s_id || $s_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'shop' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('s_id', $s_id, 'shop', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $s_id = get_from_post('s_id_for_shop_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $s_id == NULL || !$s_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_shop_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $shop_data = array();
            if ($_FILES['challan_for_shop_upload_challan']['name'] != '') {
                $main_path = 'documents/shop/';
                //            if (!is_dir($main_path)) {
                //                mkdir($main_path);
                //                chmod("$main_path", 0755);
                //            }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'shop';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_shop_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_shop_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $shop_data['challan'] = $filename;
                $shop_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $shop_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $shop_data['status'] = VALUE_NINE;
            }
            $shop_data['payment_type'] = $payment_type;
            $shop_data['updated_by'] = $user_id;
            $shop_data['updated_time'] = date('Y-m-d H:i:s');
            $shop_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_THIRTYTHREE, $s_id, $user_id, $shop_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_THIRTYTHREE, 'fees_bifurcation', $update_data, 'module_id', $s_id);
            }

            $this->utility_model->update_data('s_id', $s_id, 'shop', $shop_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $shop_data['total_fees'];
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
            $s_id = get_from_post('shop_id_for_shop_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$s_id || $s_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['s_registration_no'] = "LE/LI/DMN/S&E/" . get_from_post('registration_number_for_shop_approve') . "/" . date('Y');
            $update_data['s_certificate_expiry_date'] = get_from_post('valid_upto_for_shop_approve');
            $update_data['s_remark'] = get_from_post('remarks_for_shop_approve');
            if (!$update_data['s_registration_no']) {
                echo json_encode(get_error_array(REGISTRATION_FILE_NO_MESSAGE));
                return false;
            }
            if (!$update_data['s_certificate_expiry_date']) {
                echo json_encode(get_error_array(DATE_MESSAGE));
                return false;
            }
            if (!$update_data['s_remark']) {
                echo json_encode(get_error_array(SHOP_REMARK_MESSAGE));
                return false;
            }
            $existing_shop_data = $this->utility_model->check_registration_number('s_registration_no', $update_data['s_registration_no'], 'shop');
            if (is_array($existing_shop_data)) {
                if (count(array($existing_shop_data)) > 0) {
                    echo json_encode(get_error_array(REGISTRATION_NUMBER_EXISTS_MESSAGE));
                    return false;
                }
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }

            if ($_FILES['certificate_file_for_shop_approve']['name'] == '') {
                echo json_encode(get_error_array(UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['certificate_file_for_shop_approve']['size'];
            if ($evidence_size == 0) {
                echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $main_path = 'certificate';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $ad_path = $main_path . DIRECTORY_SEPARATOR . 'labour';
            if (!is_dir($ad_path)) {
                mkdir($ad_path);
                chmod("$ad_path", 0755);

                $file = DIRECTORY_SEPARATOR . 'index.html';
                $temp_path = $main_path . $file;
                chmod($temp_path, 0755);
                copy($temp_path, $ad_path . $file);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['certificate_file_for_shop_approve']['name']);
            $filename = 'sc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $ad_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['certificate_file_for_shop_approve']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $update_data['certificate_file'] = $filename;
            $temp_fc_filename = 'temp_sfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            error_reporting(E_ERROR);
            $data = array('shop_data' => $ex_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('shop/qr_barcode', $data, TRUE));
            $temp_fc_path = $ad_path . DIRECTORY_SEPARATOR . $temp_fc_filename;

            // Save Temporary QR Code File
            $mpdf->Output($temp_fc_path, 'F');

            $temp_files_to_merge = array();
            array_push($temp_files_to_merge, $temp_fc_path);
            array_push($temp_files_to_merge, $final_path);
            $final_certificate_filename = 'sfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            $final_filepath = FCPATH . $ad_path . DIRECTORY_SEPARATOR . $final_certificate_filename;

            // Merge QR Code File with Uploaded Certificate
            merge_pdf($final_filepath, $temp_files_to_merge);

            // Remove Temporary QR Code File
            if (file_exists($temp_fc_path)) {
                unlink($temp_fc_path);
            }

            $update_data['final_certificate'] = $final_certificate_filename;
            $update_data['s_certificate_expiry_date'] = convert_to_mysql_date_format($update_data['s_certificate_expiry_date']);
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYTHREE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('s_id', $s_id, 'shop', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_THIRTYTHREE, $s_id);
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
            $s_id = get_from_post('shop_id_for_shop_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$s_id || $s_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['s_remark'] = get_from_post('remarks_for_shop_reject');
            if (!$update_data['s_remark']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('s_id', $s_id, 'shop');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYTHREE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('s_id', $s_id, 'shop', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_THIRTYTHREE, $s_id);
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

    function generate_excel() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == null || !$user_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $this->db->trans_start();
            $excel_data = $this->shop_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Shop&Establishment_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Shop & Establishment Name',
                'Registration Category', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_THIRTYTHREE]) ? $prefix_module_array[VALUE_THIRTYTHREE] : '';
                    $list['s_id'] = generate_registration_number($prefix, $list['s_id']);
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
* EOF: ./application/controllers/Shop.php
*/
