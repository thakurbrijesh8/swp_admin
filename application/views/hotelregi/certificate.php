<?php
$barcode_number = generate_barcode_number(VALUE_SIX, $hotelregi_data['hotelregi_id']);

$header_array = array();
$header_array['title'] = 'Form-V';
$header_array['department_name'] = 'Department of Tourism';
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

<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Form - V</div>
<div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">(See Rule 3)</div>
<div style="font-size: 14px; margin-left: 30px; margin-top: 50px;">Registration No. : <div style="margin-left:  130px;margin-top: -18px;border-bottom: 1px solid black;width: 250px;text-align: center;"><?php echo $hotelregi_data['registration_number']; ?></div></div>
<div style="font-size: 14px; text-align: center; margin-top: 30px;font-weight: bold;text-decoration: underline;">CERTIFICATE OF REGISTRATION OF HOTEL</div>
<div style="font-size: 14px; margin-top: 20px;word-spacing: 9px;margin-left: 110px;">This is to certify that</div><div style="margin-left:  290px;margin-top: -18px;border-bottom: 1px solid black;width: 340px;text-align: center;"><?php echo $hotelregi_data['name_of_hotel']; ?></div><div style="margin-left:  650px;margin-top: -18px;">has been</div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 9px;margin-left: 30px;">registered under the Goa, Daman and Diu Registration of Tourist Trade Act, 1982. The </div>
<div style="font-size: 14px; margin-top: 10px;word-spacing: 9px;margin-bottom: 50px;margin-left: 30px;">other particulars of the hotel are as under :-</div>
<table class="CompanyDetails">
    <tr>
        <td class="first-column">(a)</td>
        <td class="second-column">Name of the Hotel </td>
        <td class="third-column">
            <?php echo $hotelregi_data['name_of_hotel']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">(b)</td>
        <td class="second-column">Area where the Hotel is operated</td>
        <td class="third-column">
            <?php echo $hotelregi_data['name_of_tourist_area']; ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">(c)</td>
        <td class="second-column">This certificate is valid up to </td>
        <td class="third-column">
            <?php echo convert_to_new_date_format($hotelregi_data['valid_upto']); ?>
        </td>
    </tr>
    <tr>
        <td class="first-column">(d)</td>
        <td class="second-column">Grade of Hotel</td>
        <td class="third-column">
            <?php echo $hotelregi_data['category_of_hotel']; ?>
        </td>
    </tr>
</table>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 30px;margin-left: 20px;word-spacing: 5px;">"This license is subject to all statutory and legal compliances by the applicant. The owner shall be solely responsible for any violations respect to any laws."</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 20px;word-spacing: 5px;">Place <div style="margin-left:  60px;margin-top: -17px;">: Daman</div></div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 20px;word-spacing: 5px;">Dated <div style="margin-left:  60px;margin-top: -20px;">:  <?php echo convert_to_new_date_format($hotelregi_data['submitted_datetime']); ?>&emsp;</div></div>
<br/>

<div style="font-size: 14px; text-align: right; margin-bottom: 5px; margin-right: 40px;"><img src="<?php echo HOTELREGI_DOC_PATH; ?><?php echo $hotelregi_data['signature']; ?>" height="80px" width="80px"></div>
<div style="font-size: 14px; text-align: right; margin-top: 20px; margin-right: 20px;font-weight: bold;word-spacing: 5px;">Director of Tourism<br>Daman.</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>