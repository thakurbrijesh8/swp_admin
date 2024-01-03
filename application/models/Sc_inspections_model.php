<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sc_inspections_model extends CI_Model {

    function get_all_sci_list($start, $length, $search_iua = '', $search_itype = '', $search_cbname = '', $search_cbaddress = '', $search_status = '') {
        $this->db->select("*, date_format(status_datetime, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_iua != '') {
            $this->db->where('inspection_under_act', $search_iua);
        }
        if ($search_itype != '') {
            $this->db->where('inspection_type', $search_itype);
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
        $this->db->from('sc_inspections');
        $this->db->order_by('sc_inspection_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(sc_inspection_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('sc_inspections');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_iua = '', $search_itype = '', $search_cbname = '', $search_cbaddress = '', $search_status = '') {
        $this->db->select('COUNT(sc_inspection_id) AS total_records');
        if ($search_iua != '') {
            $this->db->where('inspection_under_act', $search_iua);
        }
        if ($search_itype != '') {
            $this->db->where('inspection_type', $search_itype);
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
        $this->db->from('sc_inspections');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/Sc_inspections_model.php
 */