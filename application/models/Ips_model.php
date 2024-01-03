<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Ips_model extends CI_Model {

    function get_all_incentives_list($start, $length, $search_district = '', $search_logged_user_detail = '', $search_scheme_details = '', $search_owner_details = '', $search_manu_details = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select("r.*, u.applicant_name, u.mobile_number AS applicant_mobile, "
                . "date_format(r.created_time, '%d-%m-%Y %H:%i:%s') AS display_datetime, "
                . "sau.name AS logged_user_name, i.district, i.owner_name, i.email AS owner_email, "
                . "i.mobile_no AS owner_mobile_no, i.ap_name, i.ap_designation, i.ap_email, i.ap_mobile, "
                . "i.manu_name, i.main_plant_address, i.office_address");
        if ($search_district != '') {
            $this->db->where('i.district', $search_district);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_scheme_details != '') {
            $this->db->where('r.scheme', $search_scheme_details);
        }
        if ($search_owner_details != '') {
            $where_od = "(i.owner_name LIKE '%$search_owner_details%' OR "
                    . "i.email  LIKE '%$search_owner_details%' OR "
                    . "i.mobile_no  LIKE '%$search_owner_details%')";
            $this->db->where($where_od);
        }
        if ($search_manu_details != '') {
            $where_md = "(i.manu_name LIKE '%$search_manu_details%' OR "
                    . "i.main_plant_address  LIKE '%$search_manu_details%' OR "
                    . "i.office_address  LIKE '%$search_manu_details%')";
            $this->db->where($where_md);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_FIFTYTWO]) ? $query_module_array[VALUE_FIFTYTWO] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('r.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('r.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(r.query_status='" . VALUE_ONE . "' OR r.query_status='" . VALUE_TWO . "')");
                $this->db->where("r.status !=" . VALUE_FIVE);
                $this->db->where("r.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(r.query_status='" . VALUE_ZERO . "' OR r.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('r.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('r.query_status', $search_query_status);
        }
        $this->db->limit($length, $start);
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('ips_incentive AS r');
        $this->db->join('ips AS i', 'i.ips_id = r.ips_id');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = r.updated_by', 'left');
        $this->db->order_by('r.ips_incentive_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_total_count_of_records($search_district) {
        $this->db->select('COUNT(r.ips_incentive_id) AS total_records');
        if (!is_admin() && !is_view_all_district_user()) {
            if ($search_district != '') {
                $this->db->where('i.district', $search_district);
            }
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('ips_incentive AS r');
        $this->db->join('ips AS i', 'i.ips_id = r.ips_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_filter_count_of_records($search_district = '', $search_logged_user_detail = '', $search_scheme_details = '', $search_owner_details = '', $search_manu_details = '', $search_app_timing = '', $search_status = '', $search_query_status = '') {
        $this->db->select('COUNT(r.ips_incentive_id) AS total_records');
        if ($search_district != '') {
            $this->db->where('i.district', $search_district);
        }
        if ($search_logged_user_detail != '') {
            $where = "(u.applicant_name LIKE '%$search_logged_user_detail%' OR "
                    . "u.mobile_number  LIKE '%$search_logged_user_detail%')";
            $this->db->where($where);
        }
        if ($search_scheme_details != '') {
            $this->db->where('r.scheme', $search_scheme_details);
        }
        if ($search_owner_details != '') {
            $where_od = "(i.owner_name LIKE '%$search_owner_details%' OR "
                    . "i.email  LIKE '%$search_owner_details%' OR "
                    . "i.mobile_no  LIKE '%$search_owner_details%')";
            $this->db->where($where_od);
        }
        if ($search_manu_details != '') {
            $where_md = "(i.manu_name LIKE '%$search_manu_details%' OR "
                    . "i.main_plant_address  LIKE '%$search_manu_details%' OR "
                    . "i.office_address  LIKE '%$search_manu_details%')";
            $this->db->where($where_md);
        }
        if ($search_app_timing != '') {
            $query_module_array = $this->config->item('query_module_array');
            $qm_data = isset($query_module_array[VALUE_FIFTYTWO]) ? $query_module_array[VALUE_FIFTYTWO] : array();
            if (isset($qm_data['day'])) {
                if ($search_app_timing == VALUE_ONE) {
                    $this->db->where('r.processing_days <= ' . $qm_data['day']);
                } else if ($search_app_timing == VALUE_TWO) {
                    $this->db->where('r.processing_days > ' . $qm_data['day']);
                }
            }
        }
        if ($search_status != '') {
            if ($search_status == VALUE_TEN) {
                $this->db->where("(r.query_status='" . VALUE_ONE . "' OR r.query_status='" . VALUE_TWO . "')");
                $this->db->where("r.status !=" . VALUE_FIVE);
                $this->db->where("r.status !=" . VALUE_SIX);
            } else {
                if ($search_status != VALUE_FIVE && $search_status != VALUE_SIX) {
                    $this->db->where("(r.query_status='" . VALUE_ZERO . "' OR r.query_status='" . VALUE_THREE . "')");
                }
                $this->db->where('r.status', $search_status);
            }
        }
        if ($search_query_status != '') {
            $this->db->where('r.query_status', $search_query_status);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('ips_incentive AS r');
        $this->db->join('ips AS i', 'i.ips_id = r.ips_id');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $resc = $this->db->get();
        $record = $resc->row_array();
        return $record['total_records'];
    }

    function get_incentive_details_by_id($ips_incentive_id) {
        $this->db->select('i.*, u.applicant_name, r.ips_incentive_id, r.scheme_type, r.scheme, r.status, r.status_datetime, '
                . 'r.submitted_datetime, r.processing_days, r.query_status, r.challan, r.challan_updated_date, r.fees_paid_challan, '
                . 'r.fees_paid_challan_updated_date, r.registration_number, r.valid_upto, r.certificate_file, r.final_certificate, '
                . 'r.remarks, r.payment_type, r.user_payment_type, r.total_fees, r.last_op_reference_number');
        $this->db->where('r.ips_incentive_id', $ips_incentive_id);
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->from('ips_incentive AS r');
        $this->db->join('ips AS i', 'i.ips_id = r.ips_id');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_records_for_excel($search_district) {
        $this->db->select('r.ips_incentive_id, i.district, u.applicant_name, u.mobile_number AS applicant_mobile, '
                . 'r.scheme_type, r.scheme, i.owner_name, i.email AS owner_email, i.mobile_no AS owner_mobile_no, '
                . 'i.manu_name, i.main_plant_address, i.office_address, r.submitted_datetime, r.status, r.query_status, '
                . 'sau.name, r.status_datetime, r.remarks');
        if ($search_district != VALUE_ZERO) {
            $this->db->where('i.district', $search_district);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->where('r.status != ' . VALUE_ZERO);
        $this->db->where('r.status != ' . VALUE_ONE);
        $this->db->from('ips_incentive AS r');
        $this->db->join('ips AS i', 'i.ips_id = r.ips_id');
        $this->db->join('users as u', 'u.user_id = r.user_id');
        $this->db->join('sa_users as sau', 'sau.sa_user_id = r.updated_by', 'left');
        $this->db->order_by('r.ips_incentive_id', 'DESC');
        $resc = $this->db->get();
        return $resc->result_array();
    }

}

/*
 * EOF: ./application/models/Ips_model.php
 */