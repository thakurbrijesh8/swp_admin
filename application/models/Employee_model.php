<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Employee_model extends CI_Model {

    function get_all_employee_list($start, $length) {
        $this->db->select('e.*, d.department_name, d.district');
        $this->db->limit($length, $start);
        $this->db->where('e.is_delete !=' . IS_DELETE);
        $this->db->from('employee AS e');
        $this->db->join('department as d', 'd.department_id = e.department_id');
        $this->db->order_by('d.department_name', 'ASC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records() {
        $this->db->select('COUNT(employee_id) AS total_records');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('employee');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records() {
        $this->db->select('COUNT(e.employee_id) AS total_records');
        $this->db->where('e.is_delete !=' . IS_DELETE);
        $this->db->from('employee AS e');
        $this->db->join('department as d', 'd.department_id = e.department_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

}

/*
 * EOF: ./application/models/BOCW_model.php
 */