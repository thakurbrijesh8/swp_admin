<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Tourismevent_model extends CI_Model {

    function get_all_tourismevent_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("t.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(t.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('t.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('t.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(t.name_of_person  LIKE '%$search_applicant_detail%' OR "
                    . "t.name_of_event  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_TWENTYFOUR]) ? $query_module_array[VALUE_TWENTYFOUR] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('t.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('t.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(t.query_status='" . VALUE_ONE . "' OR t.query_status='" . VALUE_TWO . "')");
                $this->db->where("t.status !=" . VALUE_FIVE);
                $this->db->where("t.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(t.query_status='" . VALUE_ZERO . "' OR t.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('t.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('t.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('t.is_delete !=' . IS_DELETE);
        $this->db->where('t.status != ' . VALUE_ZERO);
        $this->db->where('t.status != ' . VALUE_ONE);
        $this->db->from('tourismevent AS t');
        $this->db->join('users as u', 'u.user_id = t.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = t.updated_by', 'left');
        $this->db->order_by('t.tourismevent_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_tourismevent_by_id($tourismevent_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('tourismevent_id', $tourismevent_id);
        $this->db->from('tourismevent');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(tourismevent_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('tourismevent');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {

        $this->db->select('COUNT(t.tourismevent_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('t.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('t.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(t.name_of_person  LIKE '%$search_applicant_detail%' OR "
                    . "t.name_of_event  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_TWENTYFOUR]) ? $query_module_array[VALUE_TWENTYFOUR] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('t.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('t.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(t.query_status='" . VALUE_ONE . "' OR t.query_status='" . VALUE_TWO . "')");
                $this->db->where("t.status !=" . VALUE_FIVE);
                $this->db->where("t.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(t.query_status='" . VALUE_ZERO . "' OR t.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('t.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('t.query_status', $search_query_status);
        }
        $this->db->where('t.is_delete !=' . IS_DELETE);
        $this->db->where('t.status != ' . VALUE_ZERO);
        $this->db->where('t.status != ' . VALUE_ONE);
        $this->db->from('tourismevent AS t');
        $this->db->join('users as u', 'u.user_id = t.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('t.tourismevent_id, t.district,t.entity_establishment_type, u.applicant_name, u.mobile_number, t.name_of_person, '
                . 't.name_of_event, t.submitted_datetime, t.status, t.query_status, sau.name, t.status_datetime, t.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('t.district', $search_district);
        }
        $this->db->where('t.is_delete !=' . IS_DELETE);
        $this->db->where('t.status != ' . VALUE_ZERO);
        $this->db->where('t.status != ' . VALUE_ONE);
        $this->db->from('tourismevent AS t');
        $this->db->join('users as u', 'u.user_id = t.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = t.updated_by', 'left');
        $this->db->order_by('t.tourismevent_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Tourismevent_model.php
 */