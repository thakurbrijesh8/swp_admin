<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Clact_model extends CI_Model {

    function get_all_clact_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("e.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(e.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('e.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('e.entity_establishment_type', $search_entity_establishment_type);
        }

        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(e.establishment_name  LIKE '%$search_applicant_detail%' OR "
                    . "e.nature_of_work  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTYONE]) ? $query_module_array[VALUE_THIRTYONE] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('e.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('e.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(e.query_status='" . VALUE_ONE . "' OR e.query_status='" . VALUE_TWO . "')");
                $this->db->where("e.status !=" . VALUE_FIVE);
                $this->db->where("e.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(e.query_status='" . VALUE_ZERO . "' OR e.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('e.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('e.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('e.is_delete !=' . IS_DELETE);
        $this->db->where('e.status != ' . VALUE_ZERO);
        $this->db->where('e.status != ' . VALUE_ONE);
        $this->db->from('establishment AS e');
        $this->db->join('users as u', 'u.user_id = e.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = e.updated_by', 'left');
        $this->db->order_by('e.establishment_id', 'DESC');
        $resc = $this->db->get();
        //print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(establishment_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('establishment');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(e.establishment_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('e.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('e.entity_establishment_type', $search_entity_establishment_type);
        }

        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(e.establishment_name  LIKE '%$search_applicant_detail%' OR "
                    . "e.nature_of_work  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTYONE]) ? $query_module_array[VALUE_THIRTYONE] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('e.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('e.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(e.query_status='" . VALUE_ONE . "' OR e.query_status='" . VALUE_TWO . "')");
                $this->db->where("e.status !=" . VALUE_FIVE);
                $this->db->where("e.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(e.query_status='" . VALUE_ZERO . "' OR e.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('e.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('e.query_status', $search_query_status);
        }
        $this->db->where('e.is_delete !=' . IS_DELETE);
        $this->db->where('e.status != ' . VALUE_ZERO);
        $this->db->where('e.status != ' . VALUE_ONE);
        $this->db->from('establishment AS e');
        $this->db->join('users as u', 'u.user_id = e.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('c.establishment_id, c.district, c.entity_establishment_type, u.applicant_name, u.mobile_number, c.establishment_name, '
                . 'c.nature_of_work, c.submitted_datetime, c.status, c.query_status, sau.name, c.status_datetime, c.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('c.district', $search_district);
        }
        $this->db->where('c.is_delete !=' . IS_DELETE);
        $this->db->where('c.status != ' . VALUE_ZERO);
        $this->db->where('c.status != ' . VALUE_ONE);
        $this->db->from('establishment AS c');
        $this->db->join('users as u', 'u.user_id = c.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = c.updated_by', 'left');
        $this->db->order_by('c.establishment_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Clact_model.php
 */