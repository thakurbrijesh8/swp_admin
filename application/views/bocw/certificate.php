<?php
$barcode_number = generate_barcode_number(VALUE_THIRTYTWO, $bocw_data['bocw_id']);

$header_array = array();
$header_array['title'] = 'Form-II';
$header_array['department_name'] = 'Department of Labour';
$header_array['district'] = 'Daman and Diu';
//Ex.  A4, Legal
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>

<style type="text/css">
    table.CompanyDetails {
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
        word-spacing: 2px;
    }
    td.first-column{
        width: 5.1%;
        border: 1px solid black;
        text-align: center;
        word-spacing: 5px;
    }
    td.second-column{
        width: 39%;
        word-spacing: 10px;
    }
    td.third-column{
        width: 43%;
    }
    table.CompanyDetails td{
        height: 60px;
        padding: 3px;
        border: 1px solid grey;
        border-collapse: collapse;
    }
    td.border-none{
        border: none;
    }
</style>

<div style="font-size: 14px; text-align: center;font-weight:  bold;">Administartion of U.T of Daman & Diu (U.T)</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Office of the Registering Officer,</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Daman</div>
<div style="font-size: 14px; text-align: left;word-spacing: 10px;">No : <?php echo $bocw_data['registration_number']; ?></div>
<div style="font-size: 14px; text-align: right; margin-bottom: 2px;">Date : <?php echo convert_to_new_date_format($bocw_data['updated_time']); ?>&emsp;</div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">FORM - II</div>
<div style="text-align: center;">[SEE Rule 24(1)]</div>
<div style="font-size: 14px; text-align: center; margin-top: 5px;margin-left: 50px;word-spacing: 4px;"> A Certificate of Registration is hereby granted under sub-section (3) of section 7 of</div>
<div style="font-size: 14px; text-align: center; margin-top: 5px;word-spacing: 4px;"> the  Building and other Construction Workers (Regulation of Employment and Conditions of </div>
<div style="font-size: 14px; text-align: left;margin-left: 60px; margin-top: 5px;word-spacing: 4px;"> service) Act, 1996 and the rules made there under <div style="margin-left: 370px;margin-top: -19px;border-bottom: 2px dotted black;">&nbsp;</div> </div>
<div style="margin-left: 60px;margin-top: 5px;border-bottom: 2px dotted black;"><?php echo $bocw_data['name_location_of_est'];?></div> 
<div style="font-size: 14px; text-align: center; margin-top: 5px;word-spacing: 4px;"> having the following particulars subject to conditions laid down in the annexure: &emsp;&emsp;&emsp;&emsp;&emsp;</div>
<div style="font-size: 14px; text-align: center; margin-bottom:  5px;"></div>
<table class="CompanyDetails">
    <tr>
        <td class="first-column">1 </td>
        <td class="second-column">Postal Address/location where building<br>or other construction work is to be<br>carried by the Employer.</td>
        <td class="third-column">
            <?php echo $bocw_data['name_location_of_est']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">2 </td>
        <td class="second-column">Name and address of employer<br>including location of the building and <br>other construction work.</td>
        <td class="third-column">
            <?php echo $bocw_data['name_address_of_est']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">3 </td>
        <td class="second-column">Name and permanent address of the<br> establishment.</td>
        <td class="third-column">
            <?php echo $bocw_data['postal_address_of_est']; ?><br>
            <?php echo $bocw_data['name_address_of_est']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">4 </td>
        <td class="second-column">Nature of work in which building<br> workers are employed or are to be<br>employed.
        </td>
        <td class="third-column">
            <?php echo $bocw_data['nature_of_building']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="first-column">5 </td>
        <td class="second-column">Maximum number of building workers<br> to be employed on any day by the<br>employer.
        </td>
        <td class="third-column">
            <?php echo $bocw_data['max_num_building_workers']; ?><br>
        </td>
    </tr>
    <tr>
        <td class="first-column">6 </td>
        <td class="second-column">Probable date of commencement and completion of work.</td>
        <td class="third-column">
            <?php echo convert_to_new_date_format($bocw_data['estimated_date_of_commencement']); ?><br>
            <?php echo convert_to_new_date_format($bocw_data['estimated_date_of_completion']); ?>
        </td>
    </tr>
    <tr>
        <td class="first-column" style="height: 30px;">7</td>
        <td class="second-column">Other particulars relevant to the <br>employement of building workers.</td>
        <td class="third-column"></td>
        </td>
    </tr>
</table>
<br />
<!--<table style="margin-left: 490px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/bocw/<?php echo $bocw_data['mw_sign_of_principal_employer']; ?>" height="60px" width="90px"></td></tr>
</table>-->
<table style="margin-left: 58%;margin-top: 40px;word-spacing: 2px;">
    <tr><td class="border-none">Signature of Registering Officer with Seal</td></tr>
</table>
<div style="font-size: 14px;text-align: center;font-weight: bold;word-spacing: 2px;margin-top: 0px;">ANNEXURE</div>
<div style="font-size: 14px;text-align: left;margin-top: 10px;word-spacing: 0px;">The registration granted hereinabove is subject to the following conditions, namely :-</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(a)&emsp;&emsp;The certificate of registration shall be non-transferable.</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(b)&emsp;&emsp;The number of workmen employed or building workers in the establishment shall</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">not on any day, exceed the maximum number specified in the certificate of registration;</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(c)&emsp;&emsp;Save as provided in these rules, the fees paid for the grant of registration</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">certificate shall be noon-refundable'</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(d)&emsp;&emsp;the rates of wages payable to building workers by the employer shall not be less</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">then the rates prescribed under the Minimum Wages Act, 1948(II of 1948) for such</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">employment where applicable, and where the rates have beenfixed by agreement, </div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">settlement or award, not less than the rates so fixed; and</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">(e)&emsp;&emsp;The employer shall comply with the provisions of the Act and the rules made there</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">under.</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>