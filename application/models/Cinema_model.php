<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Cinema_model extends CI_Model {

    function get_all_cinema_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("c.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(c.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('c.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('c.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(c.name_of_applicant  LIKE '%$search_applicant_detail%' OR "
                    . "c.permanent_address  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_EIGHT]) ? $query_module_array[VALUE_EIGHT] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('c.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('c.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(c.query_status='" . VALUE_ONE . "' OR c.query_status='" . VALUE_TWO . "')");
                $this->db->where("c.status !=" . VALUE_FIVE);
                $this->db->where("c.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(c.query_status='" . VALUE_ZERO . "' OR c.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('c.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('c.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('c.is_delete !=' . IS_DELETE);
        $this->db->where('c.status != ' . VALUE_ZERO);
        $this->db->where('c.status != ' . VALUE_ONE);
        $this->db->from('cinema AS c');
        $this->db->join('users as u', 'u.user_id = c.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = c.updated_by', 'left');
        $this->db->order_by('c.cinema_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_cinema_by_id($cinema_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('cinema_id', $cinema_id);
        $this->db->from('cinema');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(cinema_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('cinema');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(c.cinema_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('c.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('c.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(c.name_of_applicant  LIKE '%$search_applicant_detail%' OR "
                    . "c.permanent_address  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_EIGHT]) ? $query_module_array[VALUE_EIGHT] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('c.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('c.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(c.query_status='" . VALUE_ONE . "' OR c.query_status='" . VALUE_TWO . "')");
                $this->db->where("c.status !=" . VALUE_FIVE);
                $this->db->where("c.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(c.query_status='" . VALUE_ZERO . "' OR c.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('c.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('c.query_status', $search_query_status);
        }
        $this->db->where('c.is_delete !=' . IS_DELETE);
        $this->db->where('c.status != ' . VALUE_ZERO);
        $this->db->where('c.status != ' . VALUE_ONE);
        $this->db->from('cinema AS c');
        $this->db->join('users as u', 'u.user_id = c.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('c.cinema_id, c.district, c.entity_establishment_type, u.applicant_name, u.mobile_number, c.name_of_applicant, '
                . 'c.permanent_address, c.submitted_datetime, c.status, c.query_status, sau.name, c.status_datetime, c.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('c.district', $search_district);
        }
        $this->db->where('c.is_delete !=' . IS_DELETE);
        $this->db->where('c.status != ' . VALUE_ZERO);
        $this->db->where('c.status != ' . VALUE_ONE);
        $this->db->from('cinema AS c');
        $this->db->join('users as u', 'u.user_id = c.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = c.updated_by', 'left');
        $this->db->order_by('c.cinema_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Cinema_model.php
 */