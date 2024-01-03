<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Boiler_act_renewal_model extends CI_Model {

    function get_all_boiler_act_renewal_list($start, $length, $search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("b.*,u.applicant_name,u.mobile_number AS applicant_mobile,date_format(b.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime,sau.name AS logged_user_name");
        if ($search_district != '') {
            $this->db->where('b.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('b.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(b.owner_name  LIKE '%$search_applicant_detail%' OR "
                    . "b.boiler_type  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_FOURTYFOUR]) ? $query_module_array[VALUE_FOURTYFOUR] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('b.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('b.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(b.query_status='" . VALUE_ONE . "' OR b.query_status='" . VALUE_TWO . "')");
                $this->db->where("b.status !=" . VALUE_FIVE);
                $this->db->where("b.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(b.query_status='" . VALUE_ZERO . "' OR b.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('b.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('b.query_status', $search_query_status);
        }

        $this->db->limit($length, $start);
        $this->db->where('b.is_delete !=' . IS_DELETE);
        $this->db->where('b.status != ' . VALUE_ZERO);
        $this->db->where('b.status != ' . VALUE_ONE);
        $this->db->from('boileract_renewal AS b');
        $this->db->join('users as u', 'u.user_id = b.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = b.updated_by', 'left');
        $this->db->order_by('b.boiler_renewal_id', 'DESC');
        $resc = $this->db->get();
        //print_r($this->db->last_query());   
        return $resc->result_array();
    }

    function get_boiler_act_renewal_by_id($boiler_act_renewal_id) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('boiler_renewal_id', $boiler_act_renewal_id);
        $this->db->from('boileract_renewal');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function insert_boiler_act_renewal($boiler_act_renewal_data) {
        $this->db->insert('boileract_renewal', $boiler_act_renewal_data);
        return $this->db->insert_id();
    }

    function update_boiler_act_renewal($boiler_act_renewal_id, $boiler_act_renewal_data) {
        $this->db->where('is_delete !=', IS_DELETE);
        $this->db->where('boiler_renewal_id', $boiler_act_renewal_id);
        $this->db->update('boileract_renewal', $boiler_act_renewal_data);
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(boiler_renewal_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('district', $search_district);
            }
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where('status != ' . VALUE_ZERO);
        $this->db->where('status != ' . VALUE_ONE);
        $this->db->from('boileract_renewal');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_entity_establishment_type = '', $search_logged_user_detail = '', $search_applicant_detail = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(b.boiler_renewal_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('b.district', $search_district);
        }
        if ($search_entity_establishment_type != '') {
            $this->db->where('b.entity_establishment_type', $search_entity_establishment_type);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_applicant_detail != '') {
            $where = "(b.owner_name  LIKE '%$search_applicant_detail%' OR "
                    . "b.boiler_type  LIKE '%$search_applicant_detail%')";
            $this->db->where($where);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_FOURTYFOUR]) ? $query_module_array[VALUE_FOURTYFOUR] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('b.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('b.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(b.query_status='" . VALUE_ONE . "' OR b.query_status='" . VALUE_TWO . "')");
                $this->db->where("b.status !=" . VALUE_FIVE);
                $this->db->where("b.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(b.query_status='" . VALUE_ZERO . "' OR b.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('b.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('b.query_status', $search_query_status);
        }
        $this->db->where('b.is_delete !=' . IS_DELETE);
        $this->db->where('b.status != ' . VALUE_ZERO);
        $this->db->where('b.status != ' . VALUE_ONE);
        $this->db->from('boileract_renewal AS b');
        $this->db->join('users as u', 'u.user_id = b.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_records_for_excel($search_district) {
        $this->db->select('b.boiler_renewal_id, b.district, b.entity_establishment_type, u.applicant_name, u.mobile_number, b.owner_name, '
                . 'b.boiler_type, b.submitted_datetime, b.status, b.query_status, sau.name, b.status_datetime, b.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('b.district', $search_district);
        }
        $this->db->where('b.is_delete !=' . IS_DELETE);
        $this->db->where('b.status != ' . VALUE_ZERO);
        $this->db->where('b.status != ' . VALUE_ONE);
        $this->db->from('boileract_renewal AS b');
        $this->db->join('users as u', 'u.user_id = b.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = b.updated_by', 'left');
        $this->db->order_by('b.boiler_renewal_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Fb_model.php
 */