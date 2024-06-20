<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

//    function api_for_get_submitted_app_prev_financial_year() {
//        $module_type_array = $this->config->item('query_module_array');
//        echo '<table>';
//        echo '<tr><td>Service Name</td><td>Department Name</td><td>Total</td></tr>';
//        foreach ($module_type_array as $mt_array) {
//            $this->db->select(' count(' . $mt_array['key_id_text'] . ') AS total_records');
//            $this->db->where('is_delete != ' . VALUE_ONE);
//            $this->db->where("submitted_datetime >= '2023-04-01 00:00:00'");
//            $this->db->where("submitted_datetime < '2024-04-01 00:00:00'");
//            $this->db->from($mt_array['tbl_text']);
//            $resc = $this->db->get();
//            $result = $resc->result_array();
//
//            foreach ($result as $rd) {
//                echo '<tr><td>' . $mt_array['title'] . '</td><td>' . $mt_array['department_name'] . '</td>'
//                . '<td>' . $rd['total_records'] . '</td>'
//                . '</tr>';
//            }
//        }
//        echo '</table>';
//    }

//    function check_order_details() {
//        $dv_request_params = "|" . PG_MID . "|DMNLABOUREMPAPLCR02133-46agl2P17060163712133|" . 142;
//        $query_request = http_build_query(array('queryRequest' => $dv_request_params, "aggregatorId" => PG_AGG_ID, "merchantId" => PG_MID));
//
//        $ch = curl_init(PG_DV_URL);
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
//        curl_setopt($ch, CURLOPT_SSLVERSION, 6);
//        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $query_request);
//        $response = curl_exec($ch);
//        
//        print_r($response);
//    }

//    function payment_settlement() {
//        $dv_request_params = PG_OM . "|" . PG_COUNTRY . "|" . PG_CURRENCY . "|" . "14062024";
//        $query_request = http_build_query(array('queryRequest' => $dv_request_params, "aggregatorId" => PG_AGG_ID, "merchantId" => PG_MID));
//
//        $ch = curl_init(PG_SETT_URL);
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
//        curl_setopt($ch, CURLOPT_SSLVERSION, 6);
//        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $query_request);
//        $response = curl_exec($ch);
//        if (curl_errno($ch)) {
//            echo curl_error($ch);
//        }
////        return;
////        echo '<pre>';
////        print_r($response);
////        return;
//        $this->load->library('payment_lib');
//        $iv = $this->payment_lib->generate_iv();
//        $decrypted_string = $this->payment_lib->decrypt(PG_KEY, $response, $iv);
//        if (!$decrypted_string) {
//            echo 'error';
//            return;
//        }
//        echo '<pre>';
////        $return_data = explode('|', $decrypted_string);
////        print_r($decrypted_string);
////        return;
//        // Convert XML string to SimpleXMLElement object
//        $xmlObj = simplexml_load_string($decrypted_string);
//
//        // Convert SimpleXMLElement object to array
//        $array = json_decode(json_encode($xmlObj), true);
//
//        // Output the array
//        print_r($array);
////        return;
////        echo $refund_status = $array['REFUNDDETAILS']['REFUND']['ORDERSTATUS'];
//
//        if ($array['ORDERDETAILS']['ORDER']['ORDERSTATUS'] == "Success") {
//            echo 'Payment File No. :' . $array['ORDERDETAILS']['ORDER']['PAYOUTFILENUMBER'] . '<br/>';
//            echo 'Settlement Date :' . $array['ORDERDETAILS']['ORDER']['SETTLEMENTDATE'] . '<br/>';
//            echo 'Order Amount :' . $array['ORDERDETAILS']['ORDER']['ORDERAMOUNT'] . '<br/>';
//        }
//    }
}

/*
 * EOF: ./application/controller/Api.php
 */