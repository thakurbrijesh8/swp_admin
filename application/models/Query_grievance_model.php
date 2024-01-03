<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Query_grievance_model extends CI_Model {

    function get_all_query_grievance_list($start, $length, $search_applicant_name = '', $search_status = '') {
        //$this->db->select("b.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(b.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime");
        $this->db->select('*');
        // if ($search_applicant_name != '') {
        //     $this->db->like('u.applicant_name', $search_applicant_name);
        // }
        if (is_dic_dept_user()) {
            $this->db->where_in('b.district', array(TALUKA_DAMAN, TALUKA_DIU));
        }
        if (is_dic_dnh_dept_user()) {
            $this->db->where('b.district', TALUKA_DNH);
        }
        if ($search_status != '') {
            $this->db->where('b.status', $search_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('b.is_delete !=' . IS_DELETE);
        //$this->db->where('b.status != ' . VALUE_ZERO);
        //$this->db->where('b.status != ' . VALUE_ONE);
        $this->db->from('query_grievance AS b');
        //$this->db->join('users as u', 'u.user_id = b.user_id');
        $this->db->order_by('b.created_time', 'DESC');
        $resc = $this->db->get();
        //print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_query_grievance_by_id($query_grievance_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('query_grievance_id', $query_grievance_id);
        $this->db->from('query_grievance');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(query_grievance_id) AS total_records');
        if (is_dic_dept_user()) {
            $this->db->where_in('district', array(TALUKA_DAMAN, TALUKA_DIU));
        }
        if (is_dic_dnh_dept_user()) {
            $this->db->where('district', TALUKA_DNH);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        //$this->db->where('status != ' . VALUE_ZERO);
        //$this->db->where('status != ' . VALUE_ONE);
        $this->db->from('query_grievance');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_applicant_name = '', $search_status = '') {
        $this->db->select('COUNT(b.query_grievance_id) AS total_records');
        // if ($search_applicant_name != '') {
        //     $this->db->like('u.applicant_name', $search_applicant_name);
        // }
        if ($search_status != '') {
            $this->db->where('b.status', $search_status);
        }
        if (is_dic_dept_user()) {
            $this->db->where_in('b.district', array(TALUKA_DAMAN, TALUKA_DIU));
        }
        if (is_dic_dnh_dept_user()) {
            $this->db->where('b.district', TALUKA_DNH);
        }
        $this->db->where('b.is_delete !=' . IS_DELETE);
        //$this->db->where('b.status != ' . VALUE_ZERO);
        //$this->db->where('b.status != ' . VALUE_ONE);
        $this->db->from('query_grievance AS b');
        //$this->db->join('users as u', 'u.user_id = b.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/Query_grievance_model.php
 */