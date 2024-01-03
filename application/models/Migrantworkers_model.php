<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Migrantworkers_model extends CI_Model {

    function get_all_migrantworkers_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("m.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(m.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('m.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('m.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(m.mw_name_of_establishment  LIKE '%$search_applicant_detail%' OR "
                    . "m.mw_nature_of_work_of_establishment  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTYFOUR]) ? $query_module_array[VALUE_THIRTYFOUR] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('m.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('m.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(m.query_status='" . VALUE_ONE . "' OR m.query_status='" . VALUE_TWO . "')");
                $this->db->where("m.status !=" . VALUE_FIVE);
                $this->db->where("m.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(m.query_status='" . VALUE_ZERO . "' OR m.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('m.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('m.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('m.is_delete !=' . IS_DELETE);
        $this->db->where('m.status != ' . VALUE_ZERO);
        $this->db->where('m.status != ' . VALUE_ONE);
        $this->db->from('migrantworkers AS m');
        $this->db->join('users as u', 'u.user_id = m.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = m.updated_by', 'left');
        $this->db->order_by('m.mw_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(mw_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('migrantworkers');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(m.mw_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('m.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('m.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(m.mw_name_of_establishment  LIKE '%$search_applicant_detail%' OR "
                    . "m.mw_nature_of_work_of_establishment  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_THIRTYFOUR]) ? $query_module_array[VALUE_THIRTYFOUR] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('m.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('m.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(m.query_status='" . VALUE_ONE . "' OR m.query_status='" . VALUE_TWO . "')");
                $this->db->where("m.status !=" . VALUE_FIVE);
                $this->db->where("m.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(m.query_status='" . VALUE_ZERO . "' OR m.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('m.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('m.query_status', $search_query_status);
        }
        $this->db->where('m.is_delete !=' . IS_DELETE);
        $this->db->where('m.status != ' . VALUE_ZERO);
        $this->db->where('m.status != ' . VALUE_ONE);
        $this->db->from('migrantworkers AS m');
        $this->db->join('users as u', 'u.user_id = m.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_migrantworkers_under_all_contractor($user_id, $mw_id) {
        $this->db->select('*, DATE_FORMAT(mc_date_of_commencement, "%d-%m-%Y") as mc_date_of_commencement, DATE_FORMAT(mc_date_of_termination, "%d-%m-%Y") as mc_date_of_termination');
        $this->db->where('mw_id', $mw_id);
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from('migrantcontractors');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_records_for_excel($search_district) {
        $this->db->select('m.mw_id, m.district, m.entity_establishment_type, u.applicant_name, u.mobile_number, m.mw_name_of_establishment, '
                . 'm.mw_nature_of_work_of_establishment,m.mw_principal_employer_name, m.submitted_datetime, m.status, m.query_status, sau.name, m.status_datetime, m.mw_remark');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('m.district', $search_district);
        }
        $this->db->where('m.is_delete !=' . IS_DELETE);
        $this->db->where('m.status != ' . VALUE_ZERO);
        $this->db->where('m.status != ' . VALUE_ONE);
        $this->db->from('migrantworkers AS m');
        $this->db->join('users as u', 'u.user_id = m.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = m.updated_by', 'left');
        $this->db->order_by('m.mw_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
* EOF: ./application/models/Migrantwrokers_model.php
*/