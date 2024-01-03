<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Subletting_model extends CI_Model {

    function get_all_subletting_list($start, $length, $search_applicant_name = '', $search_status = '') {
        $this->db->select("s.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(s.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_status != '') {
            $this->db->where('s.status', $search_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('sub_letting AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $this->db->order_by('s.subletting_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_subletting_by_id($subletting_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('subletting_id', $subletting_id);
        $this->db->from('sub_letting');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(subletting_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('sub_letting');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_applicant_name = '', $search_status = '') {
        $this->db->select('COUNT(s.subletting_id) AS total_records');
        if ($search_applicant_name != '') {
            $this->db->like('u.applicant_name', $search_applicant_name);
        }
        if ($search_status != '') {
            $this->db->where('s.status', $search_status);
        }
        $this->db->where('s.is_delete !=' . IS_DELETE);
        $this->db->where('s.status != ' . VALUE_ZERO);
        $this->db->where('s.status != ' . VALUE_ONE);
        $this->db->from('sub_letting AS s');
        $this->db->join('users as u', 'u.user_id = s.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */