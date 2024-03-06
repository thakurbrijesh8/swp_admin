<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Payment_model extends CI_Model {

    function get_payment_history($module_type = 0, $module_id = 0) {
        $this->db->select('fees_payment_id, op_order_number, reference_id, district, module_type, module_id, total_fees, op_status, '
                . 'op_start_datetime, reference_number, op_transaction_datetime, op_bank_code, op_bank_reference_number, op_message');
        if ($module_type != 0) {
            $this->db->where('module_type', $module_type);
        }
        if ($module_id != 0) {
            $this->db->where('module_id', $module_id);
        }
        $this->db->from('fees_payment');
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->order_by('fees_payment_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_all_payment_history($start, $length, $search_district = '', $assing_modules = array(), $search_ps = '', $search_prn = '') {
        $this->db->select('fees_payment_id, op_order_number, reference_id, district, module_type, module_id, total_fees, op_status, '
                . 'op_start_datetime, reference_number, op_transaction_datetime, op_bank_code, op_bank_reference_number, op_message');
        if ($search_district != '') {
            $this->db->where('district', $search_district);
        }
        if (!empty($assing_modules)) {
            $this->db->where_in('module_type', $assing_modules);
        }
        if ($search_ps != '') {
            $this->db->where('op_status', $search_ps);
        }
        if ($search_prn != '') {
            $this->db->like('reference_id', $search_prn);
        }
        $this->db->limit($length, $start);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('fees_payment');
        $this->db->order_by('fees_payment_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records($search_district, $assing_modules) {
        $this->db->select('COUNT(fees_payment_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
            if (!empty($assing_modules)) {
                $this->db->where_in('module_type', $assing_modules);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('fees_payment');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $assing_modules = array(), $search_ps = '', $search_prn = '') {
        $this->db->select('COUNT(fees_payment_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('district', $search_district);
        }
        if (!empty($assing_modules)) {
            $this->db->where_in('module_type', $assing_modules);
        }
        if ($search_ps != '') {
            $this->db->where('op_status', $search_ps);
        }
        if ($search_prn != '') {
            $this->db->like('reference_id', $search_prn);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('fees_payment');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_dv_details($fees_payment_id) {
        $this->db->select('t.*, u.name AS entered_by');
        $this->db->where("t.fees_payment_id", $fees_payment_id);
        $this->db->where('t.is_delete !=' . IS_DELETE);
        $this->db->from("fees_payment_dv AS t");
        $this->db->join('sa_users as u', 'u.sa_user_id = t.created_by AND t.created_by != ' . VALUE_ZERO, 'LEFT');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_hwr_details($search_district = '', $assing_modules = array(), $from_date = '', $to_date = '') {
        $this->db->select('fp.module_type, fp.district, SUM(fp.total_fees) AS fp_total_fees, fb.dept_fd_id, SUM(fb.fee) AS fb_total_fees');
        if ($search_district != '') {
            $this->db->where('fp.district', $search_district);
        }
        if (!empty($assing_modules)) {
            $this->db->where_in('fp.module_type', $assing_modules);
        }
        if ($from_date != '' && $to_date == '') {
            $this->db->where("DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d')", $from_date);
        }
        if ($from_date == '' && $to_date != '') {
            $this->db->where("DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d')", $to_date);
        }
        if ($from_date != '' && $to_date != '') {
            $this->db->where("DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d') >= '$from_date' AND DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d') <= '$to_date'");
        }
        $this->db->where('fp.op_status', VALUE_TWO);
        $this->db->where('fp.is_delete !=' . IS_DELETE);
        $this->db->from('fees_payment AS fp');
        $this->db->join('fees_bifurcation AS fb', 'fb.module_type=fp.module_type AND fb.module_id=fp.module_id AND '
                . 'fb.dept_fd_id != 0 AND fb.is_delete!=' . VALUE_ONE);
        $this->db->group_by('fp.module_type, fp.district, fb.dept_fd_id');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_md_hwr_details($module_type = '', $search_district = '', $full_head = '', $from_date = '', $to_date = '') {
        $this->db->select('fb.module_type, fb.module_id, fb.fee_description, fb.fee, fp.total_fees, '
                . 'date_format(fp.op_transaction_datetime, "%d-%m-%Y %H:%i:%s") AS op_transaction_datetime');
        if ($module_type != '') {
            $this->db->where('fb.module_type', $module_type);
        }
        if ($search_district != '') {
            $this->db->where('fp.district', $search_district);
        }
        if ($full_head != '') {
            if ($search_district == VALUE_ONE) {
                $this->db->where("(dfd.daman_full_head='$full_head')");
            } else if ($search_district == VALUE_TWO) {
                $this->db->where("(dfd.diu_full_head='$full_head')");
            } else if ($search_district == VALUE_THREE) {
                $this->db->where("(dfd.dnh_full_head='$full_head')");
            } else {
                $this->db->where("(dfd.daman_full_head='$full_head' OR dfd.diu_full_head='$full_head' OR dfd.dnh_full_head='$full_head')");
            }
        }
        if ($from_date != '' && $to_date == '') {
            $this->db->where("DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d')", $from_date);
        }
        if ($from_date == '' && $to_date != '') {
            $this->db->where("DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d')", $to_date);
        }
        if ($from_date != '' && $to_date != '') {
            $this->db->where("DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d') >= '$from_date' AND DATE_FORMAT(fp.op_transaction_datetime,'%Y-%m-%d') <= '$to_date'");
        }
        $this->db->where('fb.is_delete !=' . IS_DELETE);
        $this->db->from('fees_bifurcation AS fb');
        $this->db->join('fees_payment AS fp', 'fp.module_type=fb.module_type AND fp.module_id=fb.module_id AND '
                . 'fp.op_status = ' . VALUE_TWO . ' AND fp.is_delete!=' . VALUE_ONE);
        $this->db->join('dept_fd AS dfd', 'dfd.dept_fd_id=fb.dept_fd_id');
        $this->db->order_by('fp.op_transaction_datetime', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Payment_model.php
 */