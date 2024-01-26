<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

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
}

/*
 * EOF: ./application/controller/Api.php
 */