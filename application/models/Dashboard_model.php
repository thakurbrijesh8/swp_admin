<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Dashboard_model extends CI_Model {

    function get_status_wise_count($module_name) {
        $this->db->from('view_get_status_wise_' . $module_name . '_count');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_ds_wise_count($module_name) {
        if (is_admin() || is_view_all_district_user()) {
            
        } else {
            $this->db->where('district', get_from_session('temp_district_for_eodbsws_admin'));
        }
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('view_get_ds_wise_' . $module_name . '_count');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Dashboard_model.php
 */