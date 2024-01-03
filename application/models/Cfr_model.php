<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Cfr_model extends CI_Model {

    function get_all_cfr_list($start, $length, $search_name = '', $search_cd = '') {
        if ($search_name != '') {
            $this->db->like('full_name', $search_name);
        }
        if ($search_cd != '') {
            $where = "(landline_number LIKE '%$search_cd%' OR "
                    . "mobile_number LIKE '%$search_cd%' OR "
                    . "email  LIKE '%$search_cd%')";
            $this->db->where($where);
        }
        $this->db->limit($length, $start);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('cfr');
        $this->db->order_by('created_time', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(cfr_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('cfr');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_name = '', $search_cd = '') {
        $this->db->select('COUNT(cfr_id) AS total_records');
        if ($search_name != '') {
            $this->db->like('full_name', $search_name);
        }
        if ($search_cd != '') {
            $where = "(landline_number LIKE '%$search_cd%' OR "
                    . "mobile_number LIKE '%$search_cd%' OR "
                    . "email  LIKE '%$search_cd%')";
            $this->db->where($where);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('cfr');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/Cfr_model.php
 */