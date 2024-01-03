<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class C_inspections_model extends CI_Model {

    function get_all_ci_list($start, $length, $search_cbtype = '', $search_cbname = '', $search_cbaddress = '', $search_status = '') {
        $this->db->select("*, date_format(status_datetime, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_cbtype != '') {
            $this->db->where('cb_type', $search_cbtype);
        }
        if ($search_cbname != '') {
            $this->db->like('cb_name', $search_cbname);
        }
        if ($search_cbaddress != '') {
            $this->db->like('cb_address', $search_cbaddress);
        }
        if ($search_status != '') {
            $this->db->where('status', $search_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('c_inspections');
        $this->db->order_by('c_inspection_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(c_inspection_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('c_inspections');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_cbtype = '', $search_cbname = '', $search_cbaddress = '', $search_status = '') {
        $this->db->select('COUNT(c_inspection_id) AS total_records');
        if ($search_cbtype != '') {
            $this->db->where('cb_type', $search_cbtype);
        }
        if ($search_cbname != '') {
            $this->db->like('cb_name', $search_cbname);
        }
        if ($search_cbaddress != '') {
            $this->db->like('cb_address', $search_cbaddress);
        }
        if ($search_status != '') {
            $this->db->where('status', $search_status);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('c_inspections');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/C_inspections_model.php
 */