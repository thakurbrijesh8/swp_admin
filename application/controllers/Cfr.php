<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Cfr extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('cfr_model');
    }

    function get_cfr_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['cfr_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_name = trim($columns[3]['search']['value']);
            $search_cd = trim($columns[4]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['cfr_data'] = $this->cfr_model->get_all_cfr_list($start, $length, $search_name, $search_cd);
            $success_array['recordsTotal'] = $this->cfr_model->get_total_count_of_records();
            if ($search_name != '' || $search_cd != '') {
                $success_array['recordsFiltered'] = $this->cfr_model->get_filter_count_of_records($search_name, $search_cd);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['cfr_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['cfr_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

}

/*
 * EOF: ./application/controller/Cfr.php
 */