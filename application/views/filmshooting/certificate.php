<?php
$barcode_number = generate_barcode_number(VALUE_TWENTYTWO, $filmshooting_data['filmshooting_id']);

$header_array = array();
$header_array['title'] = 'Form-1';
$header_array['department_name'] = 'Collectorate';
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
    }
    td.border-none{
        border: none;
    }
</style>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">U. T. Administration of Daman & Diu, </div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Office ofthe Collector, </div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Collectorate, Moti Daman, </div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">Daman-396220.</div>
<div style="font-size: 14px; margin-left: 500px;font-weight: bold;">Date : <?php echo date("d/m/Y"); ?></div>
<div style="font-size: 14px;margin-top: 10px;"><b>READ</b> : An Application <b><?php echo date('d/m/Y',strtotime($filmshooting_data['created_time'])); ?></b> from <b><?php echo $filmshooting_data['production_house']; ?>&nbsp;&nbsp;<?php echo $filmshooting_data['address']; ?></b></div>
<div style="font-size: 14px; text-align: center;font-weight:  bold;margin-top: 20px;">PERMISSION</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 10px;line-height: 1.6;">Approval of the Collector and District Magistrate, Daman is hereby conveyed to <b><?php echo $filmshooting_data['production_house']; ?> &nbsp;&nbsp;<?php echo $filmshooting_data['address']; ?></b> granting permission for Shooting in various locations of Daman which include <b><?php echo $filmshooting_data['shooting_location']; ?></b>, for Shooting of <b><?php echo $filmshooting_data['film_title']; ?></b> on <b><?php echo date('d/m/Y',strtotime($filmshooting_data['shooting_date_time'])); ?></b>. The permission is granted on subject to the following conditions:- </div>

<br />
<table class="CompanyDetails">
    <tr>
        <td class="first-column">1.</td>
        <td>The applicant should submit ID Proof of owner and Registration Number of his/her Unit. </td>
    </tr>
    <tr>
        <td class="first-column">2.</td>
        <td>Payment of Rs. 2000/- per day as shooting charges to be deposited in Indian Red Cross Society, Daman</td>
    </tr>
    <tr>
        <td class="first-column">3.</td>
        <td>The orgainzer shall follow the guidelines of Hon'ble Supreme Court of India on use of loudspeaker and there is no any objectionable / obscene language shall be used on the loudspeaker. </td>
    </tr>
    <tr>
        <td class="first-column">4.</td>
        <td>The organizer shall deploy traffic volunteer. </td>
    </tr>
    <tr>
        <td class="first-column">5.</td>
        <td>The organizer would cooperate with local police who engage in maintaining traffic and law & order situation. </td>
    </tr>
    <tr>
        <td class="first-column">6.</td>
        <td>The organizer shall deploy volunteer for crowd management. </td>
    </tr>
    <tr>
        <td class="first-column">7.</td>
        <td>The organizer shall equipped with fire safety equipments.</td>
    </tr>
    <tr>
        <td class="first-column">8.</td>
        <td>The organizer is liable for any untoward incident / breach ofpeace etc.</td>
    </tr>
    <tr>
        <td class="first-column">9.</td>
        <td>The organizer shall follow all terms and conditions laid down by the Government / local bodies are taken. </td>
    </tr>
    <tr>
        <td class="first-column">10.</td>
        <td>The orgainzer would ensure that there would be not traffic congestion during film shoot.</td>
    </tr>
    <tr>
        <td class="first-column">11.</td>
        <td>Fort Area is drone restricted area due to not allowed use of drone for video shooting. </td>
    </tr>
    <tr>
        <td class="first-column">12.</td>
        <td>Shooting must be finished by 10.00 PM.</td>
    </tr>
    <tr>
        <td class="first-column">13.</td>
        <td>The Applicant shall note that in event of not following the above mentioned Conditions the permission given can be revoked at any time. </td>
    </tr>
</table>
<div style="font-size: 14px; text-align: center;margin-top: 20px;">This is issued with the approval ofthe Collector/District Magistrate, Daman. </div>
<table style="margin-left: 490px;margin-top: 10px;">
    <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/filmshooting/<?php echo  $filmshooting_data['mw_sign_of_deputy_collector']; ?>" height="60px" width="90px"></td></tr>
</table>
<table style="margin-left: 58%;margin-top: 10px;word-spacing: 2px;">
    <tr><td class="border-none">Deputy Collector (Gen),</td></tr>
    <tr><td class="border-none">Daman</td></tr>
</table>
<br/>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">To,</div>
<div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;"><?php echo $filmshooting_data['production_house']; ?><br/><?php echo $filmshooting_data['address']; ?></div>

<div style="font-size: 14px;text-align: left;margin-top: 15px;word-spacing: 5px;">Copy for information : </div>
<div style="font-size: 14px; text-align: left; margin-top: 20px; margin-bottom: 5px;">1. The Sub-Divisional Police Officer, Daman to ensure safety and Law & Order.</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;">2. The Director ofTourism, Daman </div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;">3.  The Section Officer, Indian Red Cross Society, Daman to collect the fees</div>
<div style="font-size: 14px; text-align: left; margin-bottom: 5px;">4. The Asstt. Divisional Fire Omcer and Emergency Services, Daman.</div>
<br />
<br />
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>